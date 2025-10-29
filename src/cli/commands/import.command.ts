import { existsSync, createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import readline from 'node:readline';
import chalk from 'chalk';
import { Command } from './index.js';
import { MockOffer, RentalOffer, User, City, HousingType, Amenity, UserType } from '../../types/index.js';

export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  private parseAmenities(amenitiesString: string): Amenity[] {
    return amenitiesString.split(',') as Amenity[];
  }

  private createUser(name: string, email: string, avatar: string, userType: UserType): User {
    return {
      name,
      email,
      avatar,
      password: 'temp-password',
      userType
    };
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

  private convertMockToRentalOffer(mockOffer: MockOffer): RentalOffer {
    const author = this.createUser(
      mockOffer.authorName,
      mockOffer.authorEmail,
      mockOffer.authorAvatar,
      mockOffer.userType
    );

    return {
      title: mockOffer.title,
      description: mockOffer.description,
      publicationDate: new Date(),
      city: mockOffer.city,
      previewImage: mockOffer.previewImage,
      images: mockOffer.images,
      isPremium: mockOffer.isPremium,
      isFavorite: false, // По умолчанию не в избранном
      rating: mockOffer.rating,
      housingType: mockOffer.housingType,
      roomCount: mockOffer.roomCount,
      guestCount: mockOffer.guestCount,
      price: mockOffer.price,
      amenities: mockOffer.amenities,
      author,
      commentCount: 0, // По умолчанию 0 комментариев
      coordinates: {
        latitude: mockOffer.latitude,
        longitude: mockOffer.longitude
      }
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

    try {
      console.log(chalk.blue(`Импорт данных из файла: ${filePath}`));

      const readStream = createReadStream(filePath, { encoding: 'utf8' });
      const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

      let processed = 0;

      for await (const line of rl) {
        const trimmed = line.trim();
        if (!trimmed) {
          continue;
        }

        try {
          const mockOffer = this.parseTsvLine(trimmed);
          const rentalOffer = this.convertMockToRentalOffer(mockOffer);

          processed += 1;

          // Log progress for every 100th record
          if (processed % 100 === 0) {
            console.log(chalk.gray(`Обработано: ${processed} предложений...`));
          } else {
            console.log(chalk.green(`✓ Обработано предложение ${processed}:`));
            console.log(chalk.gray(`  Название: ${rentalOffer.title}`));
            console.log(chalk.gray(`  Город: ${rentalOffer.city}`));
            console.log(chalk.gray(`  Тип: ${rentalOffer.housingType}`));
            console.log(chalk.gray(`  Цена: €${rentalOffer.price}`));
            console.log(chalk.gray(`  Автор: ${rentalOffer.author.name} (${rentalOffer.author.email})`));
            console.log();
          }
        } catch (error) {
          console.error(chalk.red(`✗ Ошибка при обработке строки ${processed + 1}:`), error);
        }
      }

      console.log(chalk.blue.bold('\nИмпорт завершен!'));
      console.log(chalk.green(`Успешно обработано: ${processed} предложений`));
      console.log(chalk.yellow('В реальном приложении данные будут сохранены в базу данных MongoDB.'));

    } catch (error) {
      console.error(chalk.red('Ошибка при чтении файла:'), error);
    }
  }
}
