import axios from 'axios'
import { useEffect } from 'react'

function App() {

    useEffect(() => {
        axios.get('/api/books').then((r) => {
            console.log(r.data)
        })
    })

    return (
        <div className="App">
            <h1>hi</h1>
        </div>
    )
}

export default App
