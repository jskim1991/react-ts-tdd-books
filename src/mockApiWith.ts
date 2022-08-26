import { BookRepository } from './repository/BookRepository'
import * as BookApiContext from './ApiContext'
import { TokenRepository } from './repository/TokenRepository'

export const mockApiWith = (bookRepository: BookRepository, tokenRepository: TokenRepository) => {
    return jest.spyOn(BookApiContext, 'useApi').mockReturnValue({
        bookRepository,
        tokenRepository,
    })
}
