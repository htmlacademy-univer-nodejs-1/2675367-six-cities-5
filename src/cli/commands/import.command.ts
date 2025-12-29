import { existsSync, createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import readline from 'node:readline';
import chalk from 'chalk';
import { Command } from './index.js';
import { MockOffer, City, HousingType, Amenity, UserType } from '../../types/index.js';
import { DatabaseClient } from '../../core/database/index.js';
import { UserService, OfferService } from '../../services/database/index.js';
import { Logger } from '../../core/logger/index.js';
import { config } from '../../core/config/index.js';

export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  private parseAmenities(amenitiesString: string): Amenity[] {
    return amenitiesString.split(',') as Amenity[];
  }

  private parseTsvLine(line: string): MockOffer {
    const [
      title,
      description,
      city,
      previewImage,
      image1, image2, image3, image4, image5, image6,
      isPremium,
      rating,
      housingType,
      roomCount,
      guestCount,
      price,
      amenities,
      authorName,
      authorEmail,
      authorAvatar,
      userType,
      latitude,
      longitude
    ] = line.split('\t');

    return {
      title,
      description,
      city: city as City,
      previewImage,
      images: [image1, image2, image3, image4, image5, image6] as [string, string, string, string, string, string],
      isPremium: isPremium === 'true',
      rating: parseFloat(rating),
      housingType: housingType as HousingType,
      roomCount: parseInt(roomCount, 10),
      guestCount: parseInt(guestCount, 10),
      price: parseInt(price, 10),
      amenities: this.parseAmenities(amenities),
      authorName,
      authorEmail,
      authorAvatar,
      userType: userType as UserType,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
  }

  async execute(params: string[]): Promise<void> {
    if (params.length === 0) {
      console.error(chalk.red('Ошибка: Не указан путь к TSV файлу.'));
      console.log(chalk.yellow('Использование: --import <path>'));
      return;
    }

    const filePath = resolve(params[0]);

    if (!existsSync(filePath)) {
      console.error(chalk.red(`Ошибка: Файл ${filePath} не найден.`));
      return;
    }

    const logger = new Logger();
    const dbClient = new DatabaseClient(logger);

    const dbHost = config.get('db.host');
    const dbPort = config.get('db.port');
    const dbName = config.get('db.name');
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    try {
      console.log(chalk.blue(`Импорт данных из файла: ${filePath}`));
      console.log(chalk.blue(`Подключение к базе данных: ${uri}`));

      await dbClient.connect(uri);

      const userService = new UserService();
      const offerService = new OfferService();

      const readStream = createReadStream(filePath, { encoding: 'utf8' });
      const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

      let processed = 0;
      let saved = 0;

      for await (const line of rl) {
        const trimmed = line.trim();
        if (!trimmed) {
          continue;
        }

        try {
          const mockOffer = this.parseTsvLine(trimmed);
          processed += 1;

          // Create or find user
          let user = await userService.findByEmail(mockOffer.authorEmail);
          if (!user) {
            user = await userService.create({
              name: mockOffer.authorName,
              email: mockOffer.authorEmail,
              avatar: mockOffer.authorAvatar,
              password: 'temp-password',
              userType: mockOffer.userType
            });
          }

          // Create offer
          await offerService.create({
            title: mockOffer.title,
            description: mockOffer.description,
            publicationDate: new Date(),
            city: mockOffer.city,
            previewImage: mockOffer.previewImage,
            images: mockOffer.images,
            isPremium: mockOffer.isPremium,
            isFavorite: false,
            rating: mockOffer.rating,
            housingType: mockOffer.housingType,
            roomCount: mockOffer.roomCount,
            guestCount: mockOffer.guestCount,
            price: mockOffer.price,
            amenities: mockOffer.amenities,
            author: user._id,
            commentCount: 0,
            coordinates: {
              latitude: mockOffer.latitude,
              longitude: mockOffer.longitude
            }
          });

          saved += 1;

          if (processed % 100 === 0) {
            console.log(chalk.gray(`Обработано: ${processed} записей, сохранено: ${saved}`));
          }
        } catch (error) {
          console.error(chalk.red(`✗ Ошибка при обработке строки ${processed + 1}:`), error);
        }
      }

      console.log(chalk.blue.bold('\nИмпорт завершен!'));

      console.log(chalk.green(`Обработано записей: ${processed}`));
      console.log(chalk.green(`Сохранено в базу данных: ${saved}`));

    } catch (error) {
      console.error(chalk.red('Ошибка при импорте:'), error);
    } finally {
      await dbClient.disconnect();
    }
  }
}

