import { Component } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { Observable } from 'rxjs';
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
  public selectedProject: project = {
    pid: 0,
    title: "",
    descn: "",
    effort: 0,
};

  constructor( private pService: ProjectService) {
    this.refreshList();
    pService.onRefresh().subscribe(() => {
      this.refreshList();
    });
  }

  public refreshList(): void {
    this.pList$ = this.pService.getProjects();
  }

  public onSelect(selected: project): void {
    this.selectedProject = selected;
  }
}
