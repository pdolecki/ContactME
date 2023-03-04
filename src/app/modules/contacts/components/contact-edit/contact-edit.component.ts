import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/shared/models';

@Component({
  selector: 'cme-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactEditComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactEditComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {}

  public onEdit(): void {
    this.dialogRef.close(true);
  }

  public onEditCancel(): void {
    this.dialogRef.close();
  }
}
