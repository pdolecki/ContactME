import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cme-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingupComponent {}
