const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.join('db', 'contacts.json');


const listContacts = async () => {
    try { 
        const buffer = await fs.readFile(contactsPath, "utf-8");
        const lists = JSON.parse(buffer);
        console.table(lists);
        return lists
    } catch (err) {
        console.log(err.message)
    }
}
const getContactByID = async (contactId) => {
    try{
        const lists = await listContacts()
        const contact = lists.filter( list => list.id === contactId)
        console.table(contact)
        if (!contact) {
            return null
        }
        return contact
    } catch (err) {
        console.log(err.message)
    }
}
const removeContact = async (contactId) => {
    try {
        const buffer = await fs.readFile(contactsPath, "utf-8");
        const lists = JSON.parse(buffer);
        const updateContact = lists.filter(list => list.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(updateContact), "utf8");
        await listContacts()
    } catch (err) {
        console.log(err.message)
    }
}
const addContact = async (name, email, phone) => {
    try {
        const buffer = await fs.readFile(contactsPath, "utf-8");
        const lists = JSON.parse(buffer);
        const newContact = [
            ...lists,
            {
            id: uuidv4().toString(),
            name,
            email,
            phone
            }
        ];
        await fs.writeFile(contactsPath, JSON.stringify(newContact), "utf-8")
        await listContacts()
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    listContacts,
    getContactByID,
    removeContact,
    addContact
}