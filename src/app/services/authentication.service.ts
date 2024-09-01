import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
declare global {
  interface Window { loginSubject: Subject<any>; }
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private lss: LocalStorageService) { 
    window.loginSubject = new Subject<any>();

    window.loginSubject.asObservable().subscribe((jwt: any) => {
      var googleButton: HTMLElement = <HTMLElement>document.getElementsByClassName("googleButton")[0];
      var logoutButton: HTMLElement = <HTMLElement>document.getElementsByClassName("logout-btn")[0];

      // TODO: Login into backend server
      if (true) {
        lss.saveDataBasic("login", "true");

        googleButton.style.display = "none";
        logoutButton.style.display = "block";
      }
      else {
        lss.removeData("login");

        googleButton.style.display = "block";
        logoutButton.style.display = "none";
      }
    });
  }

  getLoginStatus(): boolean {
    return this.lss.getData("login") != "";
  };
  
}
