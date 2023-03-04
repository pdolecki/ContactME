import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cme-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactEditComponent {}
