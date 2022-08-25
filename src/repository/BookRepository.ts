import { Book } from '../domain/Book'
import { Network } from './network/Network'
import { BookDetail } from '../domain/BookDetail'

export interface BookRepository {
    books(): Promise<Book[]>
    book(isbn: string): Promise<BookDetail>
}

export class NetworkBookRepository implements BookRepository {
    network: Network

    constructor(network: Network) {
        this.network = network
    }

    async books(): Promise<Book[]> {
        const booksResponse = await this.network.get<Book[]>('/api/books')
        return booksResponse.map((book: Book) => {
            const { isbn, name, author } = book
            return {
                isbn,
                name,
                author,
            }
        })
    }

    async book(isbn: string): Promise<BookDetail> {
        const bookDetailResponse = await this.network.get<BookDetail>(`/api/books/${isbn}/detail`)
        return bookDetailResponse
    }
}
