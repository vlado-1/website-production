import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { project } from '../../models/project.model';
import { FileuploadComponent } from '../../fileupload/fileupload.component';


@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe,CommonModule, FormsModule, FileuploadComponent],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  // for emitter to work on parent, the event handler must be on component selector
  @Output()
  public delete: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public editItem: project = {pid: 0, title: "", descn: "", effort: 0, selected: false};

  public addMode: boolean = false;
  public inTitle : string;
  public inDescn : string;
  public inEffort: string;

  constructor( private pService: ProjectService) {
    this.inTitle  = "";
    this.inDescn  = "";
    this.inEffort = "";
  }
  
  onSave(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save");

    if (this.inTitle == "" && this.inDescn == "" && this.inEffort == "") {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }
    if (this.inTitle == this.editItem.title && this.inDescn == this.editItem.descn && this.inEffort == this.editItem.effort.toString()) {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }

    if (this.editItem.selected) {
      this.pService.updateProject({pid: this.editItem.pid, title: this.inTitle, descn: this.inDescn, effort: Number(this.inEffort), selected: true}).subscribe(
        (result: any) => {
          console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save finished -- Edit");
        this.pService.refresh();
      });    
    }
    else { 
      this.pService.addProject(this.inTitle, this.inDescn, this.inEffort).subscribe(
        (result: any) => {
          console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save finished -- Add");
        this.pService.refresh();
      });
    }

    this.inTitle  = "";
    this.inDescn  = "";
    this.inEffort = "";
  }

  onCancel(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onCancel", "Cancel");
    this.addMode = !this.addMode;
  }

  onAdd(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onAdd", "Add");
    this.addMode = !this.addMode;
  }

  onEdit(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onEdit", "Edit");

    this.inTitle  = this.editItem.title;
    this.inDescn  = this.editItem.descn;
    this.inEffort = this.editItem.effort.toString();

    this.addMode = !this.addMode;
  }

  onDelete(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onDelete", "Delete");
    this.delete.emit();
  }
}
