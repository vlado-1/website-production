import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { LocalStorageService } from './services/local-storage.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, ShowcaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'myweb';

  constructor(private lss: LocalStorageService, private auth: AuthenticationService) {}

  /** When app is initialized, check if the user is signed in on server */
  ngOnInit(): void {
    this.auth.isSignedIn();
  }

  /** Logout user from server */
  onLogout(): void {
    this.auth.logout();
  }
}
