import { Component } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

}
