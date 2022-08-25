import { Book } from '../domain/Book'
import axios from 'axios'
import { Network } from './Network'

interface BookRepository {
    books(): Promise<Book[]>
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
}
