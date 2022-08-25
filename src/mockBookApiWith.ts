import { BookRepository } from './repository/BookRepository'
import * as BookApiContext from './BookApiContext'
import { TokenRepository } from './repository/TokenRepository'

export const mockBookApiWith = (bookRepository: BookRepository, tokenRepository: TokenRepository) => {
    return jest.spyOn(BookApiContext, 'useBookApi').mockReturnValue({
        bookRepository,
        tokenRepository,
    })
}
