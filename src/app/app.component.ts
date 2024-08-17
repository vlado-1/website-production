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
}
