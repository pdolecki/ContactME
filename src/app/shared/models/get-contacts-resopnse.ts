import { Contact } from './contact';

export interface GetContactsResponse {
  message: string;
  contacts: Contact[];
  fetchedContactsCount: number;
}
