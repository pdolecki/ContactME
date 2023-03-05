import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Type,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { CreateComponent } from 'src/app/shared/components/create/create.component';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { EditComponent } from 'src/app/shared/components/edit/edit.component';
import { Contact } from 'src/app/shared/models';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ContactsService } from '../../services/contacts.service';

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
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchContactsData();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private fetchContactsData(): void {
    this.loaderService.enableLoader();
    this.contactsService
      .getContacts()
      .pipe(take(1))
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          this.loaderService.disableLoader();
          this.messageService.openMessage(res.message);
          return;
        }
        this.contacts = res.contacts;
        this.dataSource = new MatTableDataSource(this.contacts);
        this.cdr.detectChanges();
        this.loaderService.disableLoader();
      });
  }

  public openCreateDialog(): void {
    const dialogRef = this.matDialog.open(CreateComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((newContact) => {
        if (!newContact) return;
        this.contactsService
          .createContact(newContact)
          .pipe(take(1))
          .subscribe((res) => {
            if (res instanceof HttpErrorResponse) {
              this.loaderService.disableLoader();
              this.messageService.openMessage(res.message);
              return;
            }
            this.messageService.openMessage('Contact created successfully!');
            this.fetchContactsData();
          });
      });
  }

  public openEditDialog(contactId: Pick<Contact, '_id'>): void {
    const contact = this.contacts.find(
      (contact) => contact._id === String(contactId)
    );

    const dialogRef = this.matDialog.open(EditComponent, {
      data: { contact },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((updatedContact) => {
        if (!updatedContact || !contact) return;
        this.contactsService
          .updateContact({ id: contact._id, ...updatedContact })
          .pipe(take(1))
          .subscribe((res) => {
            if (res instanceof HttpErrorResponse) {
              this.loaderService.disableLoader();
              this.messageService.openMessage(res.message);
              return;
            }
            this.messageService.openMessage('Contact updated successfully!');
            this.fetchContactsData();
          });
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

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (!result || !contact) return;
        this.contactsService.deleteContact(contact._id).subscribe((res) => {
          if (res instanceof HttpErrorResponse) {
            this.loaderService.disableLoader();
            this.messageService.openMessage(res.message);
            return;
          }
          this.messageService.openMessage('Contact updated successfully!');
          this.fetchContactsData();
        });
      });
  }
}
