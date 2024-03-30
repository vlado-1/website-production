import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { project } from '../../models/project.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input()
  listItem: project = { pid:   -1,
                        title: 'None',
                        descn: 'None',
                        effort: 0};
  isSelected: boolean = false;

  public ListItemComponent () {
  }

  public onSelect(): void {
    this.isSelected = !this.isSelected;
  }
}
