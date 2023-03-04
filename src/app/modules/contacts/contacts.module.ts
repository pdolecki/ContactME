import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  declarations: [ContactsComponent, ContactAddComponent, ContactEditComponent],
  imports: [CommonModule, RouterModule, ContactsRoutingModule],
  exports: [ContactsComponent, ContactAddComponent, ContactEditComponent],
})
export class ContactsModule {}
