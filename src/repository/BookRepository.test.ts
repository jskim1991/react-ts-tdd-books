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

        it('books() returns empty list', async () => {
            spyStubNetwork.get_returnValue = []
            const bookRepository = new NetworkBookRepository(spyStubNetwork)

            const books = await bookRepository.books()

            expect(books).toEqual([])
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
})
