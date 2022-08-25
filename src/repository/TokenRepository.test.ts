import { SpyStubNetwork } from './network/SpyStubNetwork'
import { NetworkTokenRepository } from './TokenRepository'

describe('TokenRepository Tests', () => {
    it('should call Network get()', () => {
        const spyStubNetwork = new SpyStubNetwork()
        const tokenRepository = new NetworkTokenRepository(spyStubNetwork)

        tokenRepository.token()

        expect(spyStubNetwork.get_isCalled).toBe(true)
        expect(spyStubNetwork.get_url).toBe('/token')
    })

    it('should return result of Network get()', async () => {
        const spyStubNetwork = new SpyStubNetwork()
        spyStubNetwork.get_returnValue = {
            accessToken: 'some token',
            expiresAt: 3600,
        }
        const tokenRepository = new NetworkTokenRepository(spyStubNetwork)

        const result = await tokenRepository.token()

        expect(result.accessToken).toBe('some token')
        expect(result.expiresAt).toBe(3600)
    })
})
