import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

export interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  creator: string;
}

export interface GetContacts {
  message: string;
  contacts: Contact[];
  fetchedContactsCount: number;
}

// export interface GetContactsResponse extends Observable<GetContactsResponse>

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private apiService: ApiService) {}

  getContacts(): Observable<GetContacts | HttpErrorResponse> {
    console.log('getContacts');
    return this.apiService.get('/contacts');
  }
}
