import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactsRoutingModule } from './contacts-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [ContactsComponent, ContactAddComponent],
  imports: [
    CommonModule,
    RouterModule,
    ContactsRoutingModule,
    ComponentsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [ContactsComponent, ContactAddComponent],
})
export class ContactsModule {}
