import { render, waitFor } from '@testing-library/react'
import App from './App'
import { BookRepository } from './repository/BookRepository'
import { mockBookApiWith } from './mockBookApiWith'
import { SpyStubTokenRepository } from './repository/SpyStubTokenRepository'
import { NetworkTokenRepository, TokenRepository } from './repository/TokenRepository'
import { SpyStubBookRepository } from './repository/SpyStubBookRepository'

xdescribe('App Tests', () => {
    it('should fetch access token prior to fetching books', async () => {
        const spyStubTokenRepository = new SpyStubTokenRepository()
        renderApp(new SpyStubBookRepository(), spyStubTokenRepository)

        await waitFor(() => {
            expect(spyStubTokenRepository.token_isCalled).toBe(true)
        })
    })

    it('should not fetch access token while it is valid', () => {})
})

const renderApp = (bookRepository: BookRepository, tokenRepository: TokenRepository) => {
    mockBookApiWith(bookRepository, tokenRepository)
    return render(<App />)
}
