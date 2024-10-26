import { Injectable } from '@angular/core';
import { Subject, catchError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../util/ErrorHandlerREST';
import { getFormDataFromToken } from '../util/FormWrapper';
import { environment } from 'src/environments/environment';

/** Desclare a global subject that will be fired during Google sign in callback. */
declare global {
  interface Window { loginSubject: Subject<any>; }
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /** Server address */
  private serverUrl: string = environment.serverUrl;

  /** When the authentication service is created, create the global login subject
   *  and subscribe to it.
   */
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

  /** Determin login status based on local storage. */
  getLoginStatus(): boolean {
    return this.lss.getData("login") != "";
  };

  /** Determine login status based on server session information. */
  isSignedIn(): void {
    console.debug("%s: %s | %s", "AuthenticationService", "isSignedIn", "GET " + this.serverUrl + "isSignedIn");
    this.http.get(this.serverUrl + "isSignedIn", {withCredentials: true})
             .pipe(catchError(handleError))
             .subscribe((result: any) => {
                this.setButton(result.loginStatus);
             });
  }
  
  /** Logout the user from the server. */
  logout(): void {

    console.debug("%s: %s | %s", "AuthenticationService", "logout", "GET " + this.serverUrl + "logout");
    this.http.get(this.serverUrl + "logout", { withCredentials: true })
               .pipe(catchError(handleError))
               .subscribe((result: any) => {
                  this.setButton(result.loginStatus);
               });
  };

  /** 
   * Toggle between Google Sign In and logout button, depending on whether the user
   * is signed in or not.
   * 
   * @param {string} login Whether the user is logged in or not
   * @return {void}
   */
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
