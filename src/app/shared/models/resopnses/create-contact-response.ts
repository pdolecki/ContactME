import { Contact } from '../contact';

export interface CreateContactResponse {
  message: string;
  contact: Contact;
}
