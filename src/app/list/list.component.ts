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
      this.refreshList();
    });
  }

  public refreshList(): void {
    this.pList$ = this.pService.getProjects();
  }

  public onSelect(listItem: project): void {
    
    this.selectedItems = [];

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
  }

  public onDelete() {
    this.pService.deleteProjects(this.selectedItems).subscribe((response) => {
      this.refreshList();
    });
  }
}
