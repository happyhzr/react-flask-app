import {useState, useEffect} from 'react'
import './App.css'

function App() {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        async function f() {
            const response = await fetch('/api/contacts')
            const data = await response.json()
            setContacts(data.contacts)
            console.log(contacts)
        }

        f()
    }, []);
    return (
        <div></div>
    )
}

export default App
