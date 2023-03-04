import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact, GetContactsResponse } from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  // public contacts$ = new BehaviorSubject<Contact[]>([]);

  constructor(private apiService: ApiService) {}

  getContacts(): Observable<GetContactsResponse | HttpErrorResponse> {
    return this.apiService.get('contacts');
  }
}
