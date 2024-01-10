import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddBookDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  publisher: string;

  @ApiProperty()
  @IsNotEmpty()
  pageCount: number;

  @ApiProperty()
  @IsNotEmpty()
  readPage: number;

  @ApiProperty()
  @IsNotEmpty()
  reading: boolean;
}
