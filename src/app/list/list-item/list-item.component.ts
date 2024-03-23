import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input()
  itemTitle: string = "Project One";
  @Input()
  itemDescn: string = "Developing a website to host the various mini projects I do, and to provide me an opportunity to learn about different technologies.";
  @Input()
  itemEffort: number = 1;

  public ListItemComponent () {
  }
}
