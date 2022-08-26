import BookListPage from './pages/BookListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookDetailPage from './pages/BookDetailPage'
import { BookApiProvider } from './BookApiContext'
import { AuthProvider } from './AuthContext'

function App() {
    return (
        <BookApiProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<BookListPage />} />
                        <Route path="/detail/:isbn" element={<BookDetailPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </BookApiProvider>
    )
}

export default App
