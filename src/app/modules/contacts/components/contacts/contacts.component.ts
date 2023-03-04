import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'cme-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((res) => console.log);
  }
}
