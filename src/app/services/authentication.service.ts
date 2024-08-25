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
      // TODO: Login into backend server
      if (true) {
        lss.saveDataBasic("login", "true");
      }
      else {
        lss.removeData("login");
      }
    });
  }

  getLoginStatus(): boolean {
    return this.lss.getData("login") != "";
  };
  
}
