import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactsRoutingModule } from './contacts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';

@NgModule({
  declarations: [ContactsComponent, ContactAddComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    ComponentsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [ContactsComponent, ContactAddComponent],
})
export class ContactsModule {}
