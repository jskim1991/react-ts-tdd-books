import { BookRepository } from './BookRepository'
import { Book } from '../domain/Book'
import { BookDetail } from '../domain/BookDetail'

export class SpyStubBookRepository implements BookRepository {
    books_isCalled: boolean = false
    books_returnValue: any = []
    book_isCalled: boolean = false
    book_returnValue: any = {}
    book_isbnArgument: string = ''

    books(): Promise<Book[]> {
        this.books_isCalled = true
        return Promise.resolve(this.books_returnValue)
    }

    book(isbn: string): Promise<BookDetail> {
        this.book_isbnArgument = isbn
        this.book_isCalled = true
        return Promise.resolve(this.book_returnValue)
    }
}
