import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiErrorDecorator, ApiSuccessDecorator } from 'src/books/decorators';
import { AddBookDto } from 'src/books/dtos';
import { BooksService } from 'src/books/services/books/books.service';

@ApiTags('Bookshelf')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new book' })
  @ApiErrorDecorator(
    400,
    'Gagal menambahkan buku. Mohon isi nama buku',
    'Client does not provide the name fields into the request body',
  )
  @ApiErrorDecorator(
    400,
    'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    'readPage cannot be greater than pageCount.',
  )
  @ApiSuccessDecorator(
    201,
    'Buku berhasil ditambahkan.',
    {
      bookId: '1L7ZtDUFeGs7VlEt',
    },
    'Book has been successfully added.',
  )
  addBook(@Body() addBook: AddBookDto) {
    const bookID = this.bookService.createBook(addBook);

    if (addBook.readPage > addBook.pageCount) {
      throw new HttpException(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        400,
      );
    }

    return {
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: bookID,
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiSuccessDecorator(
    200,
    undefined,
    {
      books: [
        {
          id: 'Qbax5Oy7L8WKf74l',
          name: 'Buku A',
          publisher: 'Dicoding Indonesia',
        },
        {
          id: '1L7ZtDUFeGs7VlEt',
          name: 'Buku B',
          publisher: 'Dicoding Indonesia',
        },
        {
          id: 'K8DZbfI-t3LrY7lD',
          name: 'Buku C',
          publisher: 'Dicoding Indonesia',
        },
      ],
    },
    'Successfully get all books (would return an empty array if there is no books available).',
  )
  getAllBooks() {
    const books = this.bookService.fetchAllBooks();
    return {
      status: 'success',
      data: {
        books: books,
      },
    };
  }

  @Get(':bookId')
  @ApiOperation({ summary: 'Get book detail (by ID)' })
  @ApiErrorDecorator(404, 'Buku tidak ditemukan', 'Book not found')
  @ApiSuccessDecorator(
    200,
    undefined,
    {
      book: {
        id: 'aWZBUW3JN_VBE-9I',
        name: 'Buku A Revisi',
        year: 2011,
        author: 'Jane Doe',
        summary: 'Lorem Dolor sit Amet',
        publisher: 'Dicoding',
        pageCount: 200,
        readPage: 26,
        finished: false,
        reading: false,
        insertedAt: '2021-03-05T06:14:28.930Z',
        updatedAt: '2021-03-05T06:14:30.718Z',
      },
    },
    'Successfully get book detail (by ID).',
  )
  getDetailBook(@Param('bookId') bookId: string) {
    const book = this.bookService.fetchBookById(bookId);

    if (!book) {
      throw new HttpException('Buku tidak ditemukan', 404);
    }

    return {
      status: 'success',
      data: {
        book: book,
      },
    };
  }

  @Put(':bookId')
  @ApiOperation({ summary: 'Update book' })
  @ApiErrorDecorator(
    404,
    'Gagal memperbarui buku. Mohon isi nama buku',
    'Client does not provide the name fields into the request body',
  )
  @ApiErrorDecorator(
    404,
    'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    'readPage cannot be greater than pageCount.',
  )
  @ApiErrorDecorator(
    404,
    'Gagal memperbarui buku. Id tidak ditemukan',
    'Book not found, id not found',
  )
  @ApiSuccessDecorator(
    200,
    'Buku berhasil diperbarui.',
    undefined,
    'Book has been successfully updated.',
  )
  updateBook(@Param('bookId') bookId: string, @Body() bookData: AddBookDto) {
    const book = this.bookService.updateBookById(bookId, bookData);

    if (!book) {
      throw new HttpException('Buku tidak ditemukan', 404);
    }

    if (bookData.readPage > bookData.pageCount) {
      throw new HttpException(
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        400,
      );
    }

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui.',
    };
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Delete book' })
  @ApiErrorDecorator(
    404,
    'Buku gagal dihapus. Id tidak ditemukan',
    "Book can't be deleted, id not found",
  )
  @ApiSuccessDecorator(
    200,
    'Buku berhasil dihapus.',
    undefined,
    'Book has been successfully deleted.',
  )
  deleteBook(@Param('bookId') bookId: string) {
    const book = this.bookService.deleteBook(bookId);

    if (!book) {
      throw new HttpException('Buku gagal dihapus. Id tidak ditemukan', 404);
    }

    return {
      status: 'success',
      message: 'Buku berhasil dihapus.',
    };
  }
}
