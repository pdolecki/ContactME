import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { Contact } from 'src/app/shared/models';
import { ContactsService } from '../../services/contacts.service';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

@Component({
  selector: 'cme-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  public contacts: Contact[] = [];

  public displayedColumns: string[] = [
    'name',
    'phoneNumber',
    'email',
    'actions',
  ];
  public dataSource!: MatTableDataSource<Contact>;

  constructor(
    private contactsService: ContactsService,
    private matDialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.fetchContactsData();
  }

  private fetchContactsData(): void {
    this.contactsService
      .getContacts()
      .pipe(take(1))
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          return console.log('ERROR');
        }
        this.contacts = res.contacts;
        this.dataSource = new MatTableDataSource(this.contacts);
        this.cdr.detectChanges();
      });
  }

  public openEditDialog(contactId: Pick<Contact, '_id'>): void {
    const contact = this.contacts.find(
      (contact) => contact._id === String(contactId)
    );

    const dialogRef = this.matDialog.open(ContactEditComponent, {
      data: { contact },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
    });
  }

  public openDeleteDialog(contactId: Pick<Contact, '_id'>): void {
    const contact = this.contacts.find(
      (contact) => contact._id === String(contactId)
    );

    const dialogRef = this.matDialog.open(DeleteComponent, {
      data: {
        name: contact?.name,
        fields: [
          { email: contact?.email },
          { phoneNumber: contact?.phoneNumber },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || !contact) return;
      this.contactsService.deleteContact(contact._id).subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          return console.log('ERROR');
        }
        console.log('deletetion success!');
        this.fetchContactsData();
      });
    });
  }
}
