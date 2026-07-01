interface ContactListProps {
    contacts: ContactType[],
    updateContact: (contact: ContactType) => void,
    updateCallback: () => Promise<void>,
}

export interface ContactType {
    id: number,
    firstName?: string,
    lastName?: string,
    email?: string,
}

function ContactList({contacts, updateContact, updateCallback}: ContactListProps) {
    async function onDelete(id: number) {
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                await updateCallback()
            } else {
                console.error("Error occurred while deleting contact")
            }
        } catch (error) {
            console.error("Error occurred while deleting contact", error)
        }
    }

    return (
        <div>
            <h2>Contacts</h2>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    contacts.map((contact) => {
                        return (
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <button onClick={() => updateContact(contact)}>
                                        Update
                                    </button>
                                    <button onClick={() => onDelete(contact.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList;