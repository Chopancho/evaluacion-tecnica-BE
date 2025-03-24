/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const maxSize = +process.env.MAX_FILE_SIZE;
    const allowedTypes =
      /^(application\/(pdf))|(application\/(msword))|(application\/(vnd.openxmlformats-officedocument.wordprocessingml.document))|(image\/(jpeg|png|gif|bmp))|(video\/(mp4|webm|ogg))$/;
    if (value.size > maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${maxSize} bytes`,
      );
    }

    if (!allowedTypes.test(value.mimetype)) {
      throw new BadRequestException(`Invalid file type: ${value.mimetype}`);
    }

    return value;
  }
}
