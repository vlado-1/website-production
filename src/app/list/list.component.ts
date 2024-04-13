import { Component } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { Observable, map } from 'rxjs';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, EditItemComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public pList: project[] = [];

  constructor( private pService: ProjectService) {
    this.refreshList();
    pService.onRefresh().subscribe(() => {
      console.debug("%s: %s | %s", "ListComponent", "Subscribe", "Refresh received");
      this.refreshList();
    });
  }

  public refreshList(): void {
    console.debug("%s: %s | %s", "ListComponent", "refreshList", "Refreshing");
    this.pService.getProjects().subscribe(result => {
      this.pList = result;
      });
  }

  public onSelect(listItem: project): void {

    console.debug("%s: %s | %s", "ListComponent", "onSelect", "Set selected attribute");

    this.pList = this.pList.map((item: project): project => {
                  // Beware - don't confuse ABL with javascript (a = b is NOT a comparison, a == b is)
                  if (item.pid == listItem.pid) {
                      item.selected = listItem.selected;
                    }
                    return item;
                  });

    console.debug("%s: %s | %o", "ListComponent", "onSelect", this.pList);
  }

  public onDelete() {
    console.debug("%s: %s | %s", "ListComponent", "onDelete", "Delete");

    var selectedItems: project[] = this.pList.filter((item: project) => {
      return item.selected;
    });

    this.pService.deleteProjects(selectedItems).subscribe((response) => {
      console.debug("%s: %s | %s", "ListComponent", "Subscribe", "Delete finished");
      this.refreshList();
    });
  }
}