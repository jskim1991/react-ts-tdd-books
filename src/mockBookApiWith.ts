import { BookRepository } from './repository/BookRepository'
import * as BookApiContext from './BookApiContext'

export const mockBookApiWith = (bookRepository: BookRepository) => {
    return jest.spyOn(BookApiContext, 'useBookApi').mockReturnValue(bookRepository)
}
