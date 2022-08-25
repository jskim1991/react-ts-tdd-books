import { SpyStubNetwork } from './network/SpyStubNetwork'
import { NetworkBookRepository } from './BookRepository'

describe('Book Repository Tests', () => {
    let spyStubNetwork: SpyStubNetwork
    beforeEach(() => {
        spyStubNetwork = new SpyStubNetwork()
    })

    describe('books() Tests', () => {
        it('books() invokes Network get()', () => {
            const bookRepository = new NetworkBookRepository(spyStubNetwork)

            bookRepository.books()

            expect(spyStubNetwork.get_isCalled).toBe(true)
            expect(spyStubNetwork.get_url).toBe('/api/books')
        })

        it('books() returns list of books', async () => {
            spyStubNetwork.get_returnValue = [
                {
                    isbn: '1',
                    name: 'Clean Code',
                    author: 'Uncle Bob',
                },
            ]
            const bookRepository = new NetworkBookRepository(spyStubNetwork)

            const books = await bookRepository.books()

            expect(books[0].isbn).toBe('1')
            expect(books[0].name).toBe('Clean Code')
            expect(books[0].author).toBe('Uncle Bob')
        })
    })

    describe('book() Tests', () => {
        it('book() invokes Network get()', () => {
            spyStubNetwork.get_returnValue = {}
            const bookRepository = new NetworkBookRepository(spyStubNetwork)

            bookRepository.book('1999')

            expect(spyStubNetwork.get_isCalled).toBe(true)
            expect(spyStubNetwork.get_url).toBe('/api/books/1999/detail')
        })

        it('book() returns book detail', async () => {
            spyStubNetwork.get_returnValue = {
                isbn: '2',
                name: 'Greatest of All Time',
                author: 'Mick John',
                language: 'Korean',
                pages: 998,
                reviews: 0,
                ebookLink: '/ebook/2',
            }
            const bookRepository = new NetworkBookRepository(spyStubNetwork)

            const bookDetail = await bookRepository.book('2')

            expect(bookDetail.isbn).toBe('2')
            expect(bookDetail.name).toBe('Greatest of All Time')
            expect(bookDetail.author).toBe('Mick John')
            expect(bookDetail.language).toBe('Korean')
            expect(bookDetail.pages).toBe(998)
            expect(bookDetail.reviews).toBe(0)
            expect(bookDetail.ebookLink).toBe('/ebook/2')
        })
    })
})
