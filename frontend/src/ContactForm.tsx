import {type FormEvent, useState} from "react";

function ContactForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const contact = {
            firstName,
            lastName,
            email,
        }
        const response = await fetch("/api/contacts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contact)
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
        } else {
            const data = await response.json()
            console.log(data.message)
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default ContactForm;