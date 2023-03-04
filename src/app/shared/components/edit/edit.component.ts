import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../models';

@Component({
  selector: 'cme-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  name!: string;
  phoneNumber!: string;
  email!: string;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public contact: {
      contact: Contact;
    }
  ) {
    this.name = contact.contact.name;
    this.phoneNumber = contact.contact.phoneNumber;
    this.email = contact.contact.email;
  }

  public onUpdate(updateForm: any): void {
    this.dialogRef.close(updateForm.value);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
