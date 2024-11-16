import { Component } from '@angular/core';
import { ShowcaseComponent } from 'src/app/showcase/showcase.component';
import { ListComponent } from 'src/app/list/list.component';

@Component({
  selector: 'app-splitscreen',
  standalone: true,
  imports: [ListComponent, ShowcaseComponent],
  templateUrl: './splitscreen.component.html',
  styleUrl: './splitscreen.component.css'
})
export class SplitscreenComponent {

}
