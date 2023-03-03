import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedUserId!: string | null;
  private token!: string | null;
  private tokenTimer!: any;
  public isUserAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private apiService: ApiService) {}

  get jwtToken(): string {
    return this.jwtToken || '';
  }

  get userId(): string {
    return this.loggedUserId || '';
  }

  createUser(email: string, password: string) {
    return this.apiService.post('/signup', { email, password }).subscribe(
      () => {
        this.router.navigate(['/user/created']);
      },
      () => {
        this.isUserAuthenticated$.next(false);
      }
    );
  }

  login(email: string, password: string) {
    this.apiService.post('/login', { email, password }).subscribe(
      (response) => {
        if (!response.token) return;

        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.token = response.token;
        this.loggedUserId = response.userId;
        this.isUserAuthenticated$.next(true);

        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + Number(expiresInDuration)
        );

        console.log(
          '[TOKEN] Token will expire at: ',
          expirationDate.toISOString()
        );

        this.saveAuthData(response.token, expirationDate, response.userId);
        this.router.navigate(['/search']);
      },
      () => {
        this.isUserAuthenticated$.next(false);
      }
    );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      this.isUserAuthenticated$.next(false);
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    console.log(
      `[TOKEN] Token will expire in: ${parseInt(
        '' + expiresIn / 60000
      )} minutes`
    );

    if (expiresIn <= 0) return;

    this.token = authInformation.token;
    this.loggedUserId = authInformation.userId;
    this.isUserAuthenticated$.next(true);
    this.setAuthTimer(expiresIn);
  }

  logout() {
    this.token = null;
    this.isUserAuthenticated$.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.loggedUserId = null;
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', String(expirationDate));
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) return;

    return {
      token: token,
      expirationDate: new Date(String(expirationDate)),
      userId: userId,
    };
  }
}
