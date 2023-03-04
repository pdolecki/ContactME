import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  {
    path: 'add',
    component: ContactAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
