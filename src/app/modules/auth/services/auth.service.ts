import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthData } from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedUserId!: string | null;
  private token!: string | null;
  private tokenTimer!: any;

  isUserAuthenticated$ = new BehaviorSubject<boolean>(false);
  isLoading = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  get jwtToken(): string | null {
    return this.token;
  }

  get userId(): string | null {
    return this.loggedUserId;
  }

  public createUser(email: string, password: string): Subscription {
    this.isLoading = true;
    return this.apiService.post('signup', { email, password }).subscribe(
      () => {
        this.messageService.openMessage(
          'User created successfully, please log in'
        );
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        this.messageService.openMessage(err.msg);
        this.isUserAuthenticated$.next(false);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  public login(email: string, password: string): void {
    this.isLoading = true;
    this.apiService.post('login', { email, password }).subscribe(
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

        this.saveAuthData(response.token, expirationDate, response.userId);
        this.router.navigate(['/contacts']);
      },
      (err) => {
        this.messageService.openMessage(err.msg);
        this.isUserAuthenticated$.next(false);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  public autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.isUserAuthenticated$.next(false);
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn <= 0) {
      this.messageService.openMessage(
        'Session has expired, please log in again'
      );
      return;
    }

    this.token = authInformation.token;
    this.loggedUserId = authInformation.userId;
    this.isUserAuthenticated$.next(true);
    this.setAuthTimer(expiresIn);
  }

  public logout(): void {
    this.token = null;
    this.isUserAuthenticated$.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.loggedUserId = null;

    this.router.navigate(['/auth/login']);
  }

  private setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(
    token: AuthData['token'],
    expirationDate: AuthData['expirationDate'],
    userId: AuthData['userId']
  ): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', String(expirationDate));
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData(): AuthData | void {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId') || '';

    if (!token || !expirationDate) return;

    return {
      token: token,
      expirationDate: new Date(String(expirationDate)),
      userId: userId,
    };
  }
}
