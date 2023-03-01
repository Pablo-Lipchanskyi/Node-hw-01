const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.join('db', 'contacts.json');


const listContacts = async () => {
    try { 
        
        const buffer = await fs.readFile(contactsPath);
        const lists = JSON.parse(buffer.toString());
        console.log(lists);
    } catch (err) {
        console.log(err.message)
    }
}
const getContactByID = async (contactId) => {
    try{
        const buffer = await fs.readFile(contactsPath);
        const lists = JSON.parse(buffer.toString());
        const contact = lists.filter( list => list.id === contactId.toString())
        console.log(contact)
    } catch (err) {
        console.log(err.message)
    }
}
const removeContact = async (contactId) => {
    try {
        const buffer = await fs.readFile(contactsPath);
        const lists = JSON.parse(buffer.toString());
        const removedContact = lists.filter( list => list.id !== contactId.toString())
        console.log(removedContact)
    } catch (err) {
        console.log(err.message)
    }
}
const addContact = async (name, email, phone) => {
    try {
        const buffer = await fs.readFile(contactsPath);
        const lists = JSON.parse(buffer);
        const newContact = {
            id:uuidv4(),
            name,
            email,
            phone
        };
        lists.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(lists))
        return newContact
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