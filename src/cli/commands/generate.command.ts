import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import axios from 'axios';
import chalk from 'chalk';
import { Command } from './index.js';
import { MockServerOfferSeed } from '../../types/mock-data.js';
import { Amenity, City, HousingType, UserType } from '../../types/index.js';
import { getRandomBoolean, getRandomFloat, getRandomInt, getRandomItem, getRandomItems } from '../../utils/random.js';

function seedToTsv(seed: MockServerOfferSeed): string {
  const images = seed.images.join('\t');
  const amenities = seed.amenities.join(',');
  const fields = [
    seed.title,
    seed.description,
    seed.city,
    seed.previewImage,
    images,
    String(seed.isPremium),
    String(seed.rating),
    seed.housingType,
    String(seed.roomCount),
    String(seed.guestCount),
    String(seed.price),
    amenities,
    seed.authorName,
    seed.authorEmail,
    seed.authorAvatar,
    seed.userType,
    String(seed.latitude),
    String(seed.longitude)
  ];
  return fields.join('\t');
}

function generateOfferFromSeed(seed: MockServerOfferSeed): MockServerOfferSeed {
  return {
    ...seed,
    isPremium: getRandomBoolean(),
    rating: getRandomFloat(3.5, 5, 1),
    roomCount: getRandomInt(1, 4),
    guestCount: getRandomInt(1, 6),
    price: getRandomInt(50, 500),
    amenities: getRandomItems(seed.amenities, getRandomInt(1, Math.min(6, seed.amenities.length))),
    city: seed.city as City,
    housingType: seed.housingType as HousingType,
    userType: seed.userType as UserType,
    images: [
      getRandomItem(seed.images),
      getRandomItem(seed.images),
      getRandomItem(seed.images),
      getRandomItem(seed.images),
      getRandomItem(seed.images),
      getRandomItem(seed.images)
    ] as [string, string, string, string, string, string]
  };
}

export class GenerateCommand implements Command {
  getName(): string {
    return '--generate';
  }

  async execute(params: string[]): Promise<void> {
    if (params.length < 3) {
      console.error(chalk.red('Ошибка: Использование: --generate <n> <filepath> <url>'));
      return;
    }

    const [countStr, filepath, url] = params;
    const count = Number.parseInt(countStr, 10);
    if (!Number.isFinite(count) || count <= 0) {
      console.error(chalk.red('Ошибка: n должно быть положительным числом.'));
      return;
    }

    const targetPath = resolve(filepath);

    try {
      console.log(chalk.blue(`Получение seed-данных с ${url} ...`));
      const { data } = await axios.get<{ offers: MockServerOfferSeed[] }>(url, { responseType: 'json' });
      const seeds = data.offers;
      if (!Array.isArray(seeds) || seeds.length === 0) {
        console.error(chalk.red('Ошибка: Не получены валидные seed-данные.'));
        return;
      }

      const stream = createWriteStream(targetPath, { encoding: 'utf8' });
      await new Promise<void>((resolvePromise, rejectPromise) => {
        stream.on('open', async () => {
          try {
            for (let i = 0; i < count; i++) {
              const base = seeds[getRandomInt(0, seeds.length - 1)];
              const offer = generateOfferFromSeed(base);
              const line = seedToTsv(offer);
              if (!stream.write(line + '\n')) {
                await new Promise((r) => stream.once('drain', r));
              }
            }
            stream.end();
          } catch (e) {
            rejectPromise(e);
          }
        });
        stream.on('error', rejectPromise);
        stream.on('finish', () => resolvePromise());
      });

      console.log(chalk.green(`Сгенерировано ${count} записей в файл: ${targetPath}`));
    } catch (error) {
      console.error(chalk.red('Ошибка генерации или записи файла:'), error);
    }
  }
}
