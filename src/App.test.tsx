import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { BookRepository } from './repository/BookRepository'
import { mockApiWith } from './mockApiWith'
import { SpyStubTokenRepository } from './repository/SpyStubTokenRepository'
import { TokenRepository } from './repository/TokenRepository'
import { SpyStubBookRepository } from './repository/SpyStubBookRepository'
import userEvent from '@testing-library/user-event'

describe('App Tests', () => {
    it('should fetch access token prior to fetching books', async () => {
        const spyStubTokenRepository = new SpyStubTokenRepository()
        renderApp(new SpyStubBookRepository(), spyStubTokenRepository)

        await waitFor(() => {
            expect(spyStubTokenRepository.token_isCalled).toBe(true)
        })
    })

    it('should fetch access token only once', async () => {
        const spyStubTokenRepository = new SpyStubTokenRepository()
        const spyStubBookRepository = new SpyStubBookRepository()
        spyStubBookRepository.books_returnValue = [{ isbn: '1', name: 'Book1', author: 'Uncle' }]
        spyStubBookRepository.book_returnValue = {
            isbn: '1',
            name: 'Book1',
            author: 'Uncle',
            language: 'English',
            pages: 352,
            reviews: 4.5,
            ebookLink: '/ebook/1',
        }
        renderApp(spyStubBookRepository, spyStubTokenRepository)
        await waitFor(() => {
            expect(spyStubTokenRepository.token_isCalled).toBe(true)
        })

        userEvent.click(await screen.findByText('Book1'))

        await screen.findByText('English')
        expect(spyStubTokenRepository.token_calledTimes).toBe(1)
    })
})

const renderApp = (bookRepository?: BookRepository, tokenRepository?: TokenRepository) => {
    bookRepository = bookRepository ?? new SpyStubBookRepository()
    tokenRepository = tokenRepository ?? new SpyStubTokenRepository()
    mockApiWith(bookRepository, tokenRepository)
    return render(<App />)
}
