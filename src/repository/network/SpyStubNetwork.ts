import { Network } from './Network'

export class SpyStubNetwork implements Network {
    get_returnValue: any = []
    get_isCalled: boolean = false
    get_url: string = ''

    get<T>(url: string): Promise<T> {
        this.get_isCalled = true
        this.get_url = url
        return Promise.resolve(this.get_returnValue)
    }
}
