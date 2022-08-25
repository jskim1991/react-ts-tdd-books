import React from 'react'
import { BookRepository, NetworkBookRepository } from './repository/BookRepository'
import { APINetwork } from './repository/network/Network'

interface Props {
    children?: React.ReactNode
}

export const BookApiContext = React.createContext<BookRepository | undefined>(undefined)

export const BookApiProvider = ({ children }: Props) => {
    return <BookApiContext.Provider value={new NetworkBookRepository(new APINetwork())}>{children}</BookApiContext.Provider>
}

export const useBookApi = (): BookRepository => {
    const context = React.useContext(BookApiContext)
    if (context === undefined) {
        throw new Error('useBookApi must be used within BookApiProvider')
    }
    return context
}
