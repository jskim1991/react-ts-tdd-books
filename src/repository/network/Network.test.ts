import axios from 'axios'
import { APINetwork } from './Network'

describe('Network Tests', () => {
    it('get() invokes axios.get()', async () => {
        const spyAxios = jest.spyOn(axios, 'get').mockResolvedValue({})
        const network = new APINetwork()

        await network.get('/url')

        expect(spyAxios).toHaveBeenCalledWith('/url')
    })

    it('get() returns data of axios.get()', async () => {
        const spyAxios = jest.spyOn(axios, 'get').mockResolvedValue({
            data: 'return value',
        })
        const network = new APINetwork()

        const result = await network.get('/url')

        expect(result).toBe('return value')
    })
})
