import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setLoginStatus (status: boolean): void {
    console.debug("%s: %s | %s", "AuthenticationService", "setLoginStatus", "Login status broadcast");
    this.loginSubject.next(status);
  }

  onLogin(): Observable<boolean> {
    console.debug("%s: %s | %s", "AuthenticationService", "onLogin", "Login status observable");
    return this.loginSubject.asObservable();
  }
  
}
