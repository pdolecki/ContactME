import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
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
    private loaderService: LoaderService,
    private messageService: MessageService
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
    if (this.creationForm.invalid) {
      this.messageService.openMessage('Form needs to be filled up corectlly!');
      return;
    }
    this.loaderService.enableLoader();
    this.contactsService
      .createContact(this.creationForm.value)
      .pipe(take(1))
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          this.loaderService.disableLoader();
          this.messageService.openMessage(res.message);
          return;
        }
        this.messageService.openMessage('Contact created successfully!');
        this.loaderService.disableLoader();
      });
  }

  public getFormControl(formControlName: string): FormControl {
    return this.creationForm.get(formControlName) as FormControl;
  }
}
