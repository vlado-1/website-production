import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowcaseComponent } from './showcase/showcase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, ShowcaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myweb';

  onLogout(): void {
    var googleButton: HTMLElement = <HTMLElement>document.getElementsByClassName("googleButton")[0];
    var logoutButton: HTMLElement = <HTMLElement>document.getElementsByClassName("logout-btn")[0];   

    googleButton.style.display = "flex";
    logoutButton.style.display = "none";
  }
}
