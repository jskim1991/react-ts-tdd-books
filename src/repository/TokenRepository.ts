import { Token } from '../domain/Token'
import { Network } from './network/Network'

export interface TokenRepository {
    token(): Promise<Token>
}

export class NetworkTokenRepository implements TokenRepository {
    network: Network

    constructor(network: Network) {
        this.network = network
    }

    async token(): Promise<Token> {
        return await this.network.get('/token')
    }
}
