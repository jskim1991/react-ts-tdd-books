import BookListPage from './pages/BookListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookDetailPage from './pages/BookDetailPage'
import { ApiProvider } from './ApiContext'
import { AuthProvider } from './AuthContext'

function App() {
    return (
        <ApiProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<BookListPage />} />
                        <Route path="/detail/:isbn" element={<BookDetailPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ApiProvider>
    )
}

export default App
