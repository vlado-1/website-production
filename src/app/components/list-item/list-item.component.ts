import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { project } from '../../types/project.model';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
 
  public assetPath: string = environment.assets;

  /** Project item encapsulated by this component. */
  @Input()
  listItem: project = { pid:   -1,
                        title: 'None',
                        descn: 'None',
                        pageUrl: "",
                        selected: false,
                        file: null};
  
  /** Emitter of the selected event for project items. */
  // for emitter to work on parent, the event handler must be on component selector
  @Output()
  updateSelected: EventEmitter<project> = new EventEmitter<project>();

  public ListItemComponent () {
  }

  /** Fires on click event, sets item status to selected and fires the event emitter.*/
  public onSelect(): void {
    console.debug("%s: %s | %s", "ListItemComponent", "onSelect", "Select");
    this.listItem.selected = !this.listItem.selected;
    this.updateSelected.emit(this.listItem);
  }
}
