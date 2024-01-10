import { ApiProperty } from '@nestjs/swagger';

type Book = {
  id: string;
  name: string;
  publisher: string;
};

type BookId = {
  bookId: string;
};

type Data<T, U> = {
  data: T | T[] | U;
};

type DataType = Data<Book, BookId>;
export class SuccessDTO {
  @ApiProperty({ default: 'success' })
  status: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: DataType;
}
