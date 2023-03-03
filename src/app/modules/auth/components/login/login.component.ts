import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cme-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
