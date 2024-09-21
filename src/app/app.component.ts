import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, ShowcaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'myweb';

  constructor(private lss: LocalStorageService) {}

  ngOnInit(): void {
      this.lss.removeData("login");
  }

  onLogout(): void {
    var googleButton: HTMLElement = <HTMLElement>document.getElementsByClassName("googleButton")[0];
    var logoutButton: HTMLElement = <HTMLElement>document.getElementsByClassName("logout-btn")[0];   

    this.lss.removeData("login");

    googleButton.style.display = "flex";
    logoutButton.style.display = "none";
  }
}
