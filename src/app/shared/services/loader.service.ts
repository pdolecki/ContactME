import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loadingActive$ = new BehaviorSubject<boolean>(false);

  public enableLoader(): void {
    this.loadingActive$.next(true);
  }

  public disableLoader(): void {
    this.loadingActive$.next(false);
  }
}
