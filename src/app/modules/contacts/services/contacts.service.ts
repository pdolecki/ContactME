import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GetContactsResponse,
  DeleteContactResponse,
} from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private apiService: ApiService) {}

  getContacts(): Observable<GetContactsResponse | HttpErrorResponse> {
    return this.apiService.get('contacts');
  }

  deleteContact(
    contactId: string
  ): Observable<DeleteContactResponse | HttpErrorResponse> {
    return this.apiService.delete(`contacts/${contactId}`);
  }
}
