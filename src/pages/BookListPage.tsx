import { useEffect, useState } from 'react'
import { Book } from '../domain/Book'
import { useNavigate } from 'react-router-dom'
import { useBookApi } from '../BookApiContext'

const BookListPage = () => {
    const navigate = useNavigate()
    const bookApi = useBookApi()
    const [books, setBooks] = useState<Book[]>([])

    const fetchBooks = async () => {
        const booksResponse = await bookApi.bookRepository.books()
        setBooks(booksResponse)
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div>
            <ul>
                {books.map((book) => {
                    return (
                        <li
                            key={book.isbn}
                            onClick={() => {
                                navigate(`/detail/${book.isbn}`)
                            }}
                        >
                            <div>{book.name}</div>
                            <div>{book.author}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BookListPage
