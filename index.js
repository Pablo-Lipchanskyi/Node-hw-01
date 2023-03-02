const {
  listContacts,
  getContactByID,
  addContact,
  removeContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const arg = program.opts;

function callAction({ action, id, name, email,phone }) {
    switch (action) {
        case "list":
            listContacts();
            break;
        case "get":
            getContactByID(id);
            break;
        case "add":
            addContact(name, email, phone);
            break;
        case "remove":
            removeContact(id);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

callAction(arg);
