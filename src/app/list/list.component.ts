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

  public pList$: Observable<project[]> = new Observable<project[]>();
  public selectedItems: project[] = [];

  constructor( private pService: ProjectService) {
    this.refreshList();
    pService.onRefresh().subscribe(() => {
      console.debug("%s: %s | %s", "ListComponent", "Subscribe", "Refresh received");
      this.refreshList();
    });
  }

  public refreshList(): void {
    console.debug("%s: %s | %s", "ListComponent", "refreshList", "Refreshing");
    this.pList$ = this.pService.getProjects();
  }

  public onSelect(listItem: project): void {
    
    this.selectedItems = [];

    console.debug("%s: %s | %s", "ListComponent", "onSelect", "Sync >> selected item => list");

    this.pList$ = this.pList$.pipe(map((list: project[]): project[] => {
      return list.map((item: project): project => {
        if (item.pid == listItem.pid) {
          item.selected = listItem.selected;
        }
        return item;
      });
    }));

    this.pList$.forEach((list: project[]) => {
      list.forEach((item: project) => {
        if (item.selected) {
          this.selectedItems.push(item);
        }
      });
    });

    console.debug("%s: %s | %o", "ListComponent", "onSelect", this.selectedItems);
  }

  public onDelete() {
    console.debug("%s: %s | %s", "ListComponent", "onDelete", "Delete");

    this.pService.deleteProjects(this.selectedItems).subscribe((response) => {
      console.debug("%s: %s | %s", "ListComponent", "Subscribe", "Delete finished");
      this.refreshList();
    });
  }
}
