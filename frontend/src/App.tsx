import {useState, useEffect} from 'react'
import './App.css'
import ContactList, {type ContactType} from "./ContactList.tsx";
import ContactForm from "./ContactForm.tsx";

function App() {
    const [contacts, setContacts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentContact, setCurrentContact] = useState<ContactType | null>(null)

    useEffect(() => {
        fetchContacts()
    }, []);

    async function fetchContacts() {
        const response = await fetch('/api/contacts')
        const data = await response.json()
        setContacts(data.contacts)
    }

    function closeModal() {
        setIsModalOpen(false)
        setCurrentContact(null)
    }

    function openCreateModal() {
        if (!isModalOpen) {
            setIsModalOpen(true)
        }
    }

    function openEditModal(contact: ContactType) {
        if (isModalOpen) {
            return
        }
        setCurrentContact(contact)
        setIsModalOpen(true)
    }

    async function onUpdate() {
        closeModal()
        await fetchContacts()
    }

    return (
        <div>
            <ContactList contacts={contacts} updateContact={openEditModal}/>
            <button onClick={openCreateModal}>Create New Contact</button>
            {
                isModalOpen ? <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
                </div> : null
            }
        </div>
    )
}

export default App
