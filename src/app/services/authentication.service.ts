import { Injectable } from '@angular/core';
import { Subject, catchError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../util/ErrorHandlerREST';
import { getFormDataFromToken } from '../util/FormWrapper';

declare global {
  interface Window { loginSubject: Subject<any>; }
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private serverUrl: string = 'http://localhost:3000/';

  constructor(private lss: LocalStorageService, private http: HttpClient) { 
    window.loginSubject = new Subject<any>();

    window.loginSubject.asObservable().subscribe((jwt: any) => {
      console.debug("%s: %s | %s", "AuthenticationService", "window.loginSubject", "POST " + this.serverUrl + "login");
      this.http.post(this.serverUrl + "login", getFormDataFromToken(jwt), { withCredentials: true })
               .pipe(catchError(handleError))
               .subscribe((result: any) => {
                this.setButton(result.loginStatus);
               });
    });
  }

  getLoginStatus(): boolean {
    return this.lss.getData("login") != "";
  };

  isSignedIn(): void {
    console.debug("%s: %s | %s", "AuthenticationService", "isSignedIn", "GET " + this.serverUrl + "isSignedIn");
    this.http.get(this.serverUrl + "isSignedIn", {withCredentials: true})
             .pipe(catchError(handleError))
             .subscribe((result: any) => {
                this.setButton(result.loginStatus);
             });
  }
  
  logout(): void {

    console.debug("%s: %s | %s", "AuthenticationService", "logout", "GET " + this.serverUrl + "logout");
    this.http.get(this.serverUrl + "logout", { withCredentials: true })
               .pipe(catchError(handleError))
               .subscribe((result: any) => {
                  this.setButton(result.loginStatus);
               });
  };

  setButton(login: string): void {

    var googleButton: HTMLElement = <HTMLElement>document.getElementsByClassName("googleButton")[0];
    var logoutButton: HTMLElement = <HTMLElement>document.getElementsByClassName("logout-btn")[0];

    if (login == 'true') {
      console.debug("%s: %s", "AuthenticationService", "Logged In");
      this.lss.saveDataBasic("login", "true");

      googleButton.style.display = "none";
      logoutButton.style.display = "block";
    }
    else {
      console.debug("%s: %s", "AuthenticationService", "Logged Out");
      this.lss.removeData("login");

      googleButton.style.display = "flex";
      logoutButton.style.display = "none";
    }
  }
}
