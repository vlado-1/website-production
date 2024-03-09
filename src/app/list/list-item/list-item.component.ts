import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  itemName: string = "Project One";
  itemDesc: string = "Developing a website to host the various mini projects I do, and to provide me an opportunity to learn about different technologies.";
  itemDate: string = "24/02/2024";

  public ListItemComponent (iname: string, idesc: string, idate: string) {
    this.itemName = iname;
    this.itemDesc = idesc;
    this.itemDate = idate;
  }
}
