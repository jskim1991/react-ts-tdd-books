import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookDetail } from '../domain/BookDetail'
import { useBookApi } from '../BookApiContext'

const BookDetailPage = () => {
    const bookApi = useBookApi()
    const { isbn } = useParams()
    const [bookDetail, setBookDetail] = useState<BookDetail | undefined>(undefined)

    const fetchBook = async (isbn: string) => {
        const bookDetailResponse = await bookApi.book(isbn)
        setBookDetail(bookDetailResponse)
    }

    useEffect(() => {
        if (isbn === undefined) {
            return
        }

        fetchBook(isbn)
    }, [])

    return (
        <div>
            <div>{bookDetail?.isbn}</div>
            <div>{bookDetail?.name}</div>
            <div>{bookDetail?.author}</div>
            <div>{bookDetail?.language}</div>
            <div>{bookDetail?.pages}</div>
            <div>{bookDetail?.reviews}</div>
            <div>{bookDetail?.ebookLink}</div>
        </div>
    )
}

export default BookDetailPage
