
import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import axios from 'axios';
import chalk from 'chalk';
import { Command } from './index.js';
import { City, HousingType, UserType, Amenity, CITIES_COORDINATES } from '../../types/index.js';
import { getRandomInt, getRandomFloat, getRandomItem, getRandomItems } from '../../utils/random.js';

interface MockData {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[];
  housingTypes: HousingType[];
  amenities: Amenity[];
  authorNames: string[];
  authorEmails: string[];
  authorAvatars: string[];
  userTypes: UserType[];
}

export class GenerateCommand implements Command {
  getName(): string {
    return '--generate';
  }

  async execute(params: string[]): Promise<void> {

    if (params.length !== 3) {
      console.error(chalk.red('Ошибка: Неверное количество параметров.'));
      console.log(chalk.yellow('Использование: --generate <n> <path> <url>'));
      console.log(chalk.gray('  n - количество записей для генерации'));
      console.log(chalk.gray('  path - путь к файлу для сохранения TSV'));
      console.log(chalk.gray('  url - адрес JSON-сервера'));
      return;
    }

    const [recordCount, filePath, serverUrl] = params;
    const count = parseInt(recordCount, 10);

    if (isNaN(count) || count <= 0) {
      console.error(chalk.red('Ошибка: Количество записей должно быть положительным числом.'));
      return;
    }

    const resolvedPath = resolve(filePath);

    try {
      console.log(chalk.blue('Загрузка данных с JSON-сервера...'));
      const mockData = await this.fetchMockData(serverUrl);

      console.log(chalk.blue(`Генерация ${count} записей в файл: ${resolvedPath}`));

      const writeStream = createWriteStream(resolvedPath, { encoding: 'utf8' });

      // Generate data line by line
      for (let i = 0; i < count; i++) {
        const tsvLine = this.generateTsvLine(mockData);
        writeStream.write(`${tsvLine}\n`);

        if ((i + 1) % 100 === 0) {
          console.log(chalk.gray(`Обработано: ${i + 1}/${count}`));
        }
      }

      writeStream.end();

      writeStream.on('finish', () => {
        console.log(chalk.green.bold(`\n✓ Успешно сгенерировано ${count} записей!`));
        console.log(chalk.yellow(`Файл сохранён: ${resolvedPath}`));
      });

    } catch (error) {
      console.error(chalk.red('Ошибка при генерации данных:'), error);
    }
  }

  private async fetchMockData(url: string): Promise<MockData> {
    try {
      const response = await axios.get(url);
      const data = response.data;

      return {
        titles: data.titles || [],
        descriptions: data.descriptions || [],
        cities: data.cities || [],
        previewImages: data.previewImages || [],
        images: data.images || [],
        housingTypes: data.housingTypes || [],
        amenities: data.amenities || [],
        authorNames: data.authorNames || [],
        authorEmails: data.authorEmails || [],
        authorAvatars: data.authorAvatars || [],
        userTypes: data.userTypes || []
      };
    } catch (error) {
      throw new Error(`Не удалось загрузить данные с сервера: ${error}`);
    }
  }

  private generateTsvLine(mockData: MockData): string {
    const city = getRandomItem(mockData.cities);
    const coordinates = CITIES_COORDINATES[city];

    const title = getRandomItem(mockData.titles);
    const description = getRandomItem(mockData.descriptions);
    const previewImage = getRandomItem(mockData.previewImages);

    // Generate 6 random images
    const images = Array.from({ length: 6 }, () => getRandomItem(mockData.images));

    const isPremium = Math.random() > 0.7;
    const rating = getRandomFloat(1, 5, 1);
    const housingType = getRandomItem(mockData.housingTypes);
    const roomCount = getRandomInt(1, 5);
    const guestCount = getRandomInt(1, 10);
    const price = getRandomInt(100, 1000);

    // Random amenities (1-5)
    const amenityCount = getRandomInt(1, 5);
    const amenities = getRandomItems(mockData.amenities, amenityCount);

    const authorName = getRandomItem(mockData.authorNames);
    const authorEmail = getRandomItem(mockData.authorEmails);
    const authorAvatar = getRandomItem(mockData.authorAvatars);
    const userType = getRandomItem(mockData.userTypes);

    const latitude = getRandomFloat(coordinates.latitude - 0.1, coordinates.latitude + 0.1, 6);
    const longitude = getRandomFloat(coordinates.longitude - 0.1, coordinates.longitude + 0.1, 6);

    return [
      title,
      description,
      city,
      previewImage,
      ...images,
      isPremium.toString(),
      rating.toString(),
      housingType,
      roomCount.toString(),
      guestCount.toString(),
      price.toString(),
      amenities.join(','),
      authorName,
      authorEmail,
      authorAvatar,
      userType,
      latitude.toString(),
      longitude.toString()
    ].join('\t');
  }
}

