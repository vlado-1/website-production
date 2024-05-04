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
  public editItem: project = {pid: 0, title: "", descn: "", effort: 0, selected: false, upload: null, fileID: ''};

  public addMode: boolean = false;
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
  }
  
  onSave(): void {
    var formData: FormData = new FormData();
    
    console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save");

    if (this.inTitle == "" && this.inDescn == "" && this.inEffort == "") {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }
    if (this.inTitle == this.editItem.title && this.inDescn == this.editItem.descn && this.inEffort == this.editItem.effort.toString() && this.inUpload == null) {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }

    if (this.editMode) {
      this.pService.updateProject({pid: this.editItem.pid, title: this.inTitle, descn: this.inDescn, effort: Number(this.inEffort), selected: true, upload: this.inUpload, fileID: ''}).subscribe(
        (updResult: any) => {
          this.pService.uploadFile(this.inUpload).subscribe((UplResult: any) => {
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save finished -- Edit");
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "File Uploaded -- Edit -- " + UplResult.fileID);
            this.pService.refresh();

            this.inTitle  = "";
            this.inDescn  = "";
            this.inEffort = "";
            this.inUpload = null;
          });
      });    
    }
    else { 
      this.pService.addProject(this.inTitle, this.inDescn, this.inEffort, this.inUpload).subscribe(
        (updResult: any) => {
          this.pService.uploadFile(this.inUpload).subscribe((UplResult: any) => {
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Add finished -- Edit");
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "File Uploaded -- Edit -- " + UplResult.fileID);
            this.pService.refresh();

            this.inTitle  = "";
            this.inDescn  = "";
            this.inEffort = "";
            this.inUpload = null;
          });
      });    
    }
  }

  onCancel(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onCancel", "Cancel");
    this.addMode  = !this.addMode;
    this.editMode = false;
  }

  onAdd(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onAdd", "Add");
    this.addMode  = !this.addMode;
    this.editMode = false;
  }

  onEdit(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onEdit", "Edit");

    this.inTitle  = this.editItem.title;
    this.inDescn  = this.editItem.descn;
    this.inEffort = this.editItem.effort.toString();

    this.addMode  = !this.addMode;
    this.editMode = true;
  }

  onDelete(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onDelete", "Delete");
    this.delete.emit();
  }

  onUploadFiles(upload: File | null): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onUploadFiles", "Upload File");
    this.inUpload = upload;
  }
}
