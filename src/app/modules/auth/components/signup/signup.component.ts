import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cme-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.authService.createUser(
      this.signupForm.value.email,
      this.signupForm.value.password
    );
  }

  clearFormControl(formControlRef: HTMLInputElement): void {
    const formControlName = formControlRef.getAttribute('formControlName');
    if (!formControlName) return;
    this.signupForm.get(formControlName)?.setValue(null);
    formControlRef.value = '';
  }
}
