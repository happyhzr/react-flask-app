import {useState, useEffect} from 'react'
import './App.css'
import ContactList from "./ContactList.tsx";
import ContactForm from "./ContactForm.tsx";

function App() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        f()
    }, []);

    async function f() {
        const response = await fetch('/api/contacts')
        const data = await response.json()
        setContacts(data.contacts)
    }

    return (
        <div>
            <ContactList contacts={contacts}/>
            <ContactForm/>
        </div>
    )
}

export default App
