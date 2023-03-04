import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Contact } from 'src/app/shared/models';
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
    private cdr: ChangeDetectorRef
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
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
}
