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

  public editItem: project = {pid: 0, title: "", descn: "", effort: 0, selected: false, upload: null, fileId: null};

  public editMode: boolean = false;
  public inTitle : string;
  public inDescn : string;
  public inEffort: string;
  public inUpload: File | null;

  constructor( private pService: ProjectService) {
    this.inTitle  = "";
    this.inDescn  = "";
    this.inEffort = "";
    this.inUpload = null;

    this.pService.onEdit().subscribe(() => {
      this.editMode = !this.editMode;
    });

    pService.onSelect().subscribe((selected: project) => {
      this.editItem = selected;
      if (this.editItem.selected) {
        this.inTitle = this.editItem.title;
        this.inDescn = this.editItem.descn;
        this.inEffort = this.editItem.effort.toString();
        this.inUpload = this.editItem.upload;
      }
      else {
        this.reset();        
      }
    });

    pService.onUpload().subscribe((upload: File | null) => {
      this.inUpload = upload;
    });
  }
  
  onSave(): void {
    var formData: FormData = new FormData();
    
    console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save");

    this.pService.collectEditorData();

    if (this.inTitle == "" && this.inDescn == "" && this.inEffort == "") {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }
    if (this.inTitle == this.editItem.title && this.inDescn == this.editItem.descn && this.inEffort == this.editItem.effort.toString() && this.inUpload == null) {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }

    if (this.editItem.pid != 0) {
      this.pService.updateProject({pid: this.editItem.pid, title: this.inTitle, descn: this.inDescn, effort: Number(this.inEffort), selected: true, upload: this.inUpload, fileId: this.editItem.fileId}).subscribe(
        (result: any) => {
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save finished -- Edit");
            this.pService.refresh();
            this.reset();
            this.onCancel();
      });    
    }
    else { 
      this.pService.addProject(this.inTitle, this.inDescn, this.inEffort, this.inUpload).subscribe(
        (result: any) => {
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Add finished -- Edit");
            this.pService.refresh();
            this.reset();
            this.onCancel();
      });    
    }
  }

  onCancel(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onCancel", "Cancel");
    this.reset();
    this.pService.select(this.editItem);  
    this.pService.edit();
  }

  onAdd(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onAdd", "Add");
    // Deselct all project items
    this.reset();
    this.pService.select(this.editItem);  
    this.pService.edit();
  }

  onEdit(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onEdit", "Edit");

    this.inTitle  = this.editItem.title;
    this.inDescn  = this.editItem.descn;
    this.inEffort = this.editItem.effort.toString();

    this.pService.edit();
  }

  onDelete(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onDelete", "Delete");
    this.delete.emit();
  }

  reset(): void {
    this.editItem = {pid: 0, title: "", descn: "", effort: 0, selected: false, fileId: null, upload: null};
    this.inTitle  = this.editItem.title;
    this.inDescn  = this.editItem.descn;
    this.inEffort = "";
    this.inUpload = this.editItem.upload;   
  }  

}
