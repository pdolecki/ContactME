import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.creationForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ]),
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

  public clearFormControl(formControlRef: HTMLInputElement): void {
    const formControlName = formControlRef.getAttribute('formControlName');
    if (!formControlName) return;
    this.creationForm.get(formControlName)?.setValue(null);
    formControlRef.value = '';
  }

  public onSubmit(): void {
    if (this.creationForm.invalid) return;
    console.log(this.creationForm.value);
    this.contactsService
      .createContact(this.creationForm.value)
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          return console.log('ERROR');
        }
        console.log('creation success!');
      });
  }
}
