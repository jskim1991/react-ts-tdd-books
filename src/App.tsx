import BookListPage from './pages/BookListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookDetailPage from './pages/BookDetailPage'
import { BookApiProvider } from './BookApiContext'

function App() {
    return (
        <BookApiProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BookListPage />} />
                    <Route path="/detail/:isbn" element={<BookDetailPage />} />
                </Routes>
            </BrowserRouter>
        </BookApiProvider>
    )
}

export default App
