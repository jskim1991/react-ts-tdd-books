import axios from 'axios'

export interface Network {
    get<T>(url: string): Promise<T>
}

export class APINetwork implements Network {
    async get<T>(url: string): Promise<T> {
        const { data } = await axios.get(url)
        return data
    }
}
