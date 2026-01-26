import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

// Define CLI options
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

// Execute action based on CLI input
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contacts = await listContacts();
      console.table(contacts);
      break;
    }

    case "get": {
      const contact = await getContactById(id);
      console.log(contact);
      break;
    }

    case "add": {
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    }

    case "remove": {
      const removed = await removeContact(id);
      console.log(removed);
      break;
    }

    default:
      console.warn(
        "Unknown action type!. Available actions: list, get, add, remove",
      );
  }
}

invokeAction(options);
