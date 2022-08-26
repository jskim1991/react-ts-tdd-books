import React from 'react'
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

export const ApiContext = React.createContext<ContextProps | undefined>(undefined)

export const ApiProvider = ({ children }: Props) => {
    return (
        <ApiContext.Provider
            value={{
                bookRepository: new NetworkBookRepository(new APINetwork()),
                tokenRepository: new NetworkTokenRepository(new APINetwork()),
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = (): ContextProps => {
    const context = React.useContext(ApiContext)
    if (context === undefined) {
        throw new Error('useApi must be used within ApiProvider')
    }
    return context
}
