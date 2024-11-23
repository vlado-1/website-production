import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'myweb';

  constructor(private lss: LocalStorageService, private auth: AuthenticationService) {}

  /** When app is initialized, check if the user is signed in on server */
  ngOnInit(): void {
    this.loadGISLibrary();
    this.auth.isSignedIn();
  }

  /** Logout user from server */
  onLogout(): void {
    this.auth.logout();
  }

  /** Load the GIS lilbrary to enable Google Sign In Button */
  loadGISLibrary () {
    let node = document.createElement('script'); // creates the script tag
    node.src = 'https://accounts.google.com/gsi/client'; // sets the source (insert url in between quotes)
    node.type = 'text/javascript'; // set the script type
    node.async = true; // makes script run asynchronously
    // append to head of document
    document.getElementsByTagName('head')[0].appendChild(node); 
  }
}
