import React, { useEffect, useState } from 'react'
import { Token } from './domain/Token'
import { useApi } from './ApiContext'

interface Props {
    children?: React.ReactNode
}

type ContextProps = {
    auth: Token
    acquireToken: (token: Token) => void
}

export const AuthContext = React.createContext<ContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<Token | undefined>(undefined)

    const api = useApi()

    const fetchAccessToken = async () => {
        const tokenResponse = await api.tokenRepository.token()
        const expireTime = new Date().getTime() + tokenResponse.expiresAt
        setAuth({
            accessToken: tokenResponse.accessToken,
            expiresAt: expireTime,
        })
    }

    useEffect(() => {
        if (auth === undefined) {
            fetchAccessToken()
        }
    }, [])

    const acquireTokenHandler = (token: Token) => {
        setAuth(token)
    }

    const contextValue: ContextProps = {
        auth: auth ?? {
            accessToken: '',
            expiresAt: 0,
        },
        acquireToken: acquireTokenHandler,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
