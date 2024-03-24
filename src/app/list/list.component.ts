import { Component } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { Observable } from 'rxjs';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, AddItemComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public pList$: Observable<project[]>;
  public addMode: boolean = false;

  constructor( private pService: ProjectService) {
    this.pList$ = pService.getProjects();
  }

  onSave(): void {
    console.log("Save");
    this.addMode = !this.addMode;
  }

  onCancel(): void {
    console.log("Cancel");
    this.addMode = !this.addMode;
  }

  onAdd(): void {
    console.log("Add");
    this.addMode = !this.addMode;
  }

  onDelete(): void {
    console.log("Delete");
  }
}
