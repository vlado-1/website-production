import { Component, Input } from '@angular/core';
import { project } from '../../models/project.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input()
  listItem: project = { pid:   -1,
                        title: 'None',
                        descn: 'None',
                        effort: 0};

  public ListItemComponent () {
  }
}
