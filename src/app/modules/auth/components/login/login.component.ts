import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cme-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  clearFormControl(formControlRef: HTMLInputElement): void {
    const formControlName = formControlRef.getAttribute('formControlName');
    if (!formControlName) return;
    this.loginForm.get(formControlName)?.setValue(null);
    formControlRef.value = '';
  }
}
