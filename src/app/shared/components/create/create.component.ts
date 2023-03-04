import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cme-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  name!: string;
  phoneNumber!: string;
  email!: string;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      fields: string[];
    }
  ) {}

  public onCreate(creationForm: any): void {
    this.dialogRef.close(creationForm.value);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
