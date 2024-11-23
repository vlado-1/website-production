import { Component } from '@angular/core';
import { ShowcaseComponent } from 'src/app/components/showcase/showcase.component';
import { ListComponent } from 'src/app/components/list/list.component';

@Component({
  selector: 'app-splitscreen',
  standalone: true,
  imports: [ListComponent, ShowcaseComponent],
  templateUrl: './projectview.component.html',
  styleUrl: './projectview.component.css'
})
export class ProjectviewComponent {

}
