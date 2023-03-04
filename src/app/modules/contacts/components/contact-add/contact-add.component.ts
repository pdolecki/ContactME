import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  ngOnInit(): void {}
}
