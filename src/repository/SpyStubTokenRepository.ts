import { TokenRepository } from './TokenRepository'
import { Token } from '../domain/Token'

export class SpyStubTokenRepository implements TokenRepository {
    token_returnValue: any = {}
    token_isCalled: boolean = false
    token_calledTimes: number = 0

    token(): Promise<Token> {
        this.token_calledTimes += 1
        this.token_isCalled = true
        return Promise.resolve(this.token_returnValue)
    }
}
