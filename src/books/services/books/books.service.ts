import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { AddBookDto } from 'src/books/dtos/addBook.dto';
import { BookDataType } from 'src/utils/type';

@Injectable()
export class BooksService {
  private bookData: BookDataType[] = [];

  createBook(book: AddBookDto) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = book.pageCount === book.readPage;

    const newBook = { ...book, id, finished, insertedAt, updatedAt };

    this.bookData.push(newBook);

    return newBook.id;
  }

  fetchAllBooks() {
    return this.bookData.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  fetchBookById(bookId: string) {
    return this.bookData.find((book) => book.id === bookId);
  }

  updateBookById(bookId: string, bookData: AddBookDto) {
    const index = this.bookData.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      const updatedAt = new Date().toISOString();
      const finished = bookData.pageCount === bookData.readPage;

      return (this.bookData[index] = {
        ...this.bookData[index],
        ...bookData,
        updatedAt,
        finished,
      });
    }
  }

  deleteBook(bookId: string) {
    const index = this.bookData.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      return this.bookData.splice(index, 1);
    }
  }
}
