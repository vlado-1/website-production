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

  private serverUrl: string              = 'http://localhost:3000/';

  constructor(private lss: LocalStorageService, private http: HttpClient) { 
    window.loginSubject = new Subject<any>();

    window.loginSubject.asObservable().subscribe((jwt: any) => {
      var googleButton: HTMLElement = <HTMLElement>document.getElementsByClassName("googleButton")[0];
      var logoutButton: HTMLElement = <HTMLElement>document.getElementsByClassName("logout-btn")[0];

      this.http.post(this.serverUrl + "login", getFormDataFromToken(jwt))
               .pipe(catchError(handleError))
               .subscribe((result: any) => {
                  if (result.loginStatus === 'true') {
                    console.debug("%s: %s", "AuthenticationService", "Sign In");
                    lss.saveDataBasic("login", "true");

                    googleButton.style.display = "none";
                    logoutButton.style.display = "block";
                  }
                  else {
                    console.debug("%s: %s", "AuthenticationService", "Sign Out");
                    lss.removeData("login");

                    googleButton.style.display = "block";
                    logoutButton.style.display = "none";
                  }
               });
    });
  }

  getLoginStatus(): boolean {
    return this.lss.getData("login") != "";
  };
  
}
