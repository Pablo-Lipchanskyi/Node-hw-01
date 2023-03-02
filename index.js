const contacts = require("./contacts")
const { Command } = require("commander")
const programm = new Command()

programm
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

programm.parse(process.argv);
const arg = programm.opts;

function callAction({ action, id, name, email,phone }) {
    switch (action) {
        case "list":
            contacts.listContacts()
            break;
        case "get":
            contacts.getContactByID(id)
            break;
        case "add":
            contacts.addContact(name, email, phone)
            break;
        case "remove":
            contacts.removeContact(id)
            break;
        default:
            console.warn("Unknown type")
    }
}

callAction(arg)