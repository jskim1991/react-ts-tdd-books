import { useEffect, useState } from 'react'
import { BookRepository } from '../repository/BookRepository'
import { Book } from '../domain/Book'
import { useNavigate } from 'react-router-dom'

interface Props {
    bookRepository: BookRepository
}

const BookListPage = ({ bookRepository }: Props) => {
    const navigate = useNavigate()
    const [books, setBooks] = useState<Book[]>([])

    const fetchBooks = async () => {
        const booksResponse = await bookRepository.books()
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
