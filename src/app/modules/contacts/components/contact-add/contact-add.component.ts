import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'cme-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactAddComponent implements OnInit {
  creationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private cdr: ChangeDetectorRef
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

  public onSubmit(): void {
    if (this.creationForm.invalid) return;
    this.contactsService
      .createContact(this.creationForm.value)
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          return console.log('ERROR');
        }
        console.log('creation success!');
      });
  }

  getFormControl(formControlName: string): FormControl {
    return this.creationForm.get(formControlName) as FormControl;
  }
}
