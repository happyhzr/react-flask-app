import {type FormEvent, useState} from "react";
import {type ContactType} from "./ContactList.tsx";

interface ContactFormProps {
    existingContact: ContactType | null,
    updateCallback: () => Promise<void>,
}

function ContactForm({existingContact, updateCallback}: ContactFormProps) {
    const [firstName, setFirstName] = useState(existingContact?.firstName || "")
    const [lastName, setLastName] = useState(existingContact?.lastName || "")
    const [email, setEmail] = useState(existingContact?.email || "")

    const updating = existingContact !== null

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const contact = {
            firstName,
            lastName,
            email,
        }
        const url = updating ? `/api/contacts/${existingContact?.id}` : "/api/contacts"
        const options = {
            method: updating ? "PUT" : "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contact)
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            await updateCallback()
        } else {
            const data = await response.json()
            console.log(data)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="emaile">Email:</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    )
}

export default ContactForm;