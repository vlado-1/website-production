import { Component, EventEmitter, Input, Output } from '@angular/core';
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
                        effort: 0,
                        selected: false};
  
  // for emitter to work on parent, the event handler must be on component selector
  @Output()
  updateSelected: EventEmitter<project> = new EventEmitter<project>();

  public ListItemComponent () {
  }

  public onSelect(): void {
    this.listItem.selected = !this.listItem.selected;
    this.updateSelected.emit(this.listItem);
  }
}
