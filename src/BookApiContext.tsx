import React, { useEffect, useState } from 'react'
import { BookRepository, NetworkBookRepository } from './repository/BookRepository'
import { APINetwork } from './repository/network/Network'
import { NetworkTokenRepository, TokenRepository } from './repository/TokenRepository'

interface Props {
    children?: React.ReactNode
}

type ContextProps = {
    bookRepository: BookRepository
    tokenRepository: TokenRepository
}

export const BookApiContext = React.createContext<ContextProps | undefined>(undefined)

export const BookApiProvider = ({ children }: Props) => {
    return (
        <BookApiContext.Provider
            value={{
                bookRepository: new NetworkBookRepository(new APINetwork()),
                tokenRepository: new NetworkTokenRepository(new APINetwork()),
            }}
        >
            {children}
        </BookApiContext.Provider>
    )
}

export const useBookApi = (): ContextProps => {
    const context = React.useContext(BookApiContext)
    if (context === undefined) {
        throw new Error('useBookApi must be used within BookApiProvider')
    }
    return context
}
