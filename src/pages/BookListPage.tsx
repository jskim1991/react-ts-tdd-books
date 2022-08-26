import { useEffect, useState } from 'react'
import { Book } from '../domain/Book'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../ApiContext'

const BookListPage = () => {
    const navigate = useNavigate()
    const api = useApi()
    const [books, setBooks] = useState<Book[]>([])

    const fetchBooks = async () => {
        const booksResponse = await api.bookRepository.books()
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
