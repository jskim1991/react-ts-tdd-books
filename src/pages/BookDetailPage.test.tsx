import { render, waitFor, screen } from '@testing-library/react'
import { SpyStubBookRepository } from '../repository/SpyStubBookRepository'
import BookDetailPage from './BookDetailPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('BookDetailPage Tests', () => {
    it('should invoke book detail', async () => {
        const spyStubBookRepository = new SpyStubBookRepository()

        renderBookDetailPage(spyStubBookRepository)

        await waitFor(() => {
            expect(spyStubBookRepository.book_isCalled).toBe(true)
        })
    })

    it('should invoke book detail with appropriate isbn', async () => {
        const spyStubBookRepository = new SpyStubBookRepository()

        renderBookDetailPage(spyStubBookRepository)

        await waitFor(() => {
            expect(spyStubBookRepository.book_isbnArgument).toBe('999')
        })
    })

    it('should render book detail on render', async () => {
        const spyStubBookRepository = new SpyStubBookRepository()
        spyStubBookRepository.book_returnValue = {
            isbn: '1',
            name: 'Cook Book',
            author: 'Chef Jay',
            language: 'English',
            pages: 912,
            reviews: 0,
            ebookLink: '/ebook/1',
        }

        renderBookDetailPage(spyStubBookRepository)

        expect(await screen.findByText('1')).toBeInTheDocument()
        expect(screen.getByText('Cook Book')).toBeInTheDocument()
        expect(screen.getByText('Chef Jay')).toBeInTheDocument()
        expect(screen.getByText('English')).toBeInTheDocument()
        expect(screen.getByText('912')).toBeInTheDocument()
        expect(screen.getByText('0')).toBeInTheDocument()
        expect(screen.getByText('/ebook/1')).toBeInTheDocument()
    })
})

const renderBookDetailPage = (spyStubBookRepository: SpyStubBookRepository) => {
    return render(
        <MemoryRouter initialEntries={['/detail/999']}>
            <Routes>
                <Route path="/detail/:isbn" element={<BookDetailPage bookRepository={spyStubBookRepository} />}></Route>
            </Routes>
        </MemoryRouter>
    )
}
