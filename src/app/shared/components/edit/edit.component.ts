import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../models';

@Component({
  selector: 'cme-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  public updateForm!: FormGroup;

  private name: string;
  private phoneNumber: string;
  private email: string;

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA)
    private contact: {
      contact: Contact;
    },
    private formBuilder: FormBuilder
  ) {
    this.name = contact.contact.name;
    this.phoneNumber = contact.contact.phoneNumber;
    this.email = contact.contact.email;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: [this.name, Validators.required],
      email: [
        this.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        this.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern(`^(\\+48\\s)?\\d{3}([-\\s])?\\d{3}\\2?\\d{3}$`),
        ]),
      ],
    });
  }

  public getFormControl(formControlName: string): FormControl {
    return this.updateForm.get(formControlName) as FormControl;
  }

  public onUpdate(): void {
    this.dialogRef.close(this.updateForm.value);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
