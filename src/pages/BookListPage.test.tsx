import { render, screen, waitFor } from '@testing-library/react'
import BookListPage from './BookListPage'
import { SpyStubBookRepository } from '../repository/SpyStubBookRepository'
import * as router from 'react-router'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { mockBookApiWith } from '../mockBookApiWith'
import { SpyStubTokenRepository } from '../repository/SpyStubTokenRepository'

describe('BookListPage Tests', () => {
    it('should fetch books from BookRepository', async () => {
        const spyStubBookRepository = new SpyStubBookRepository()

        renderBookListPage(spyStubBookRepository)

        await waitFor(() => {
            expect(spyStubBookRepository.books_isCalled).toBe(true)
        })
    })

    it('should display list of book name and author', async () => {
        const spyStubBookRepository = new SpyStubBookRepository()
        spyStubBookRepository.books_returnValue = [
            {
                isbn: '1',
                name: 'Cook Book',
                author: 'Chef Jay',
            },
        ]

        renderBookListPage(spyStubBookRepository)

        await waitFor(() => {
            expect(screen.getByText('Cook Book')).toBeInTheDocument()
        })
        expect(screen.getByText('Chef Jay')).toBeInTheDocument()
    })

    describe('Navigation Tests', () => {
        it('should navigate to BookDetailPage when each row is clicked', async () => {
            const spyNavigate = jest.fn()
            jest.spyOn(router, 'useNavigate').mockImplementation(() => spyNavigate)
            const spyStubBookRepository = new SpyStubBookRepository()
            spyStubBookRepository.books_returnValue = [
                {
                    isbn: '199',
                    name: 'Cook Book',
                    author: 'Chef Jay',
                },
            ]
            renderBookListPage(spyStubBookRepository)

            userEvent.click(await screen.findByText('Cook Book'))

            expect(spyNavigate).toHaveBeenCalledWith('/detail/199')
        })
    })
})

const renderBookListPage = (spyStubBookRepository: SpyStubBookRepository) => {
    mockBookApiWith(spyStubBookRepository, new SpyStubTokenRepository())

    return render(
        <MemoryRouter>
            <BookListPage />
        </MemoryRouter>
    )
}
