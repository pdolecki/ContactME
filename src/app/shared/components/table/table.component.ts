import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '../../models';

@Component({
  selector: 'cme-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: string[];
  @Input() filterValue!: string;
  @Output() createClicked = new EventEmitter<void>();
  @Output() editClicked = new EventEmitter<Pick<Contact, '_id'>>();
  @Output() deleteClicked = new EventEmitter<Pick<Contact, '_id'>>();

  public onCreate(): void {
    this.createClicked.emit();
  }

  public onEdit(contactId: Pick<Contact, '_id'>): void {
    this.editClicked.emit(contactId);
  }

  public onDelete(contactId: Pick<Contact, '_id'>): void {
    this.deleteClicked.emit(contactId);
  }
}
