import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cme-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  creationForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.creationForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phoneNumber: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(`^(\\+48\\s)?\\d{3}([-\\s])?\\d{3}\\2?\\d{3}$`),
        ]),
      ],
    });
  }

  getFormControl(formControlName: string): FormControl {
    return this.creationForm.get(formControlName) as FormControl;
  }

  public onCreate(): void {
    this.dialogRef.close(this.creationForm.value);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
