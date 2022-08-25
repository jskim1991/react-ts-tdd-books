import BookListPage from './pages/BookListPage'
import { APINetwork } from './repository/network/Network'
import { NetworkBookRepository } from './repository/BookRepository'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookDetailPage from './pages/BookDetailPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BookListPage bookRepository={new NetworkBookRepository(new APINetwork())} />} />
                <Route path="/detail/:isbn" element={<BookDetailPage bookRepository={new NetworkBookRepository(new APINetwork())} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
