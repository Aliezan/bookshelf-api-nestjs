import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessDTO } from '../dtos/success.dto';

type Book = {
  id: string;
  name: string;
  publisher: string;
};

type BookId = {
  bookId: string;
};

type BookDetail = {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
  insertedAt: string;
  updatedAt: string;
};

type Data<T> = {
  [key: string]: T | T[];
};

export function ApiSuccessDecorator(
  statusCode: HttpStatus,
  message?: string,
  data?: Data<Book> | Data<BookDetail> | BookId,
  description?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: description,
      schema: {
        default: {
          status: 'success',
          message,
          data,
        },
        type: getSchemaPath(SuccessDTO),
      },
    }),
  );
}
