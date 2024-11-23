import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { project } from '../../types/project.model';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  public assetPath: string = environment.assets;

  /** For firing 'delete' event to parent. */
  // for emitter to work on parent, the event handler must be on component selector
  @Output()
  public delete: EventEmitter<void> = new EventEmitter<void>();

  /** Current item being edited */
  public editItem: project = {pid: 0, title: "", descn: "", effort: 0, selected: false, file: null};

  /** Whether component will allow editing */
  public editMode: boolean = false;

  public inTitle : string;
  public inDescn : string;
  public inEffort: string;
  public inFile: string | null;

  /** Whether the user is logged in */
  public loggedIn: boolean = false;

  /** Initialize component; subscribe to observables for editing, selecting and storing in local storage;
   *  and get loging status. */
  constructor( private pService: ProjectService, private lss: LocalStorageService, private authService: AuthenticationService) {
    this.inTitle  = "";
    this.inDescn  = "";
    this.inEffort = "";
    this.inFile = null;

    this.pService.onEdit().subscribe(() => {
      this.editMode = !this.editMode;
    });

    pService.onSelect().subscribe((selected: project) => {
      this.editItem = selected;
      if (this.editItem.selected) {
        this.inTitle  = this.editItem.title;
        this.inDescn  = this.editItem.descn;
        this.inEffort = this.editItem.effort.toString();
        this.inFile   = this.editItem.file;
      }
      else {
        this.reset();        
      }
    });

    this.lss.onStore().subscribe((key: string) => {
      if (key == "login") {
        this.loggedIn = authService.getLoginStatus();
      }
    });

    this.loggedIn = authService.getLoginStatus();
  }
  
  /** Save changes made to the project item, and if this is a new project item
   *  then add it. Call the appropriate service to add/update the project item. */
  onSave(): void {
    var formData: FormData = new FormData();
  
    console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save");

    this.inFile = this.lss.getData("File");

    if (this.inTitle == "" && this.inDescn == "" && this.inEffort == "") {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }
    if (this.inTitle == this.editItem.title && this.inDescn == this.editItem.descn && this.inEffort == this.editItem.effort.toString() && this.inFile == this.editItem.file) {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }

    if (this.editItem.pid != 0) {
      this.pService.updateProject({pid: this.editItem.pid, title: this.inTitle, descn: this.inDescn, effort: Number(this.inEffort), selected: true, file: this.inFile}).subscribe(
        (result: any) => {
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save finished -- Edit");
            this.pService.refresh();
            this.reset();
            this.onCancel();
      });    
    }
    else { 
      this.pService.addProject(this.inTitle, this.inDescn, this.inEffort, this.inFile).subscribe(
        (result: any) => {
            console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Add finished -- Edit");
            this.pService.refresh();
            this.reset();
            this.onCancel();
      });    
    }
  }

  /** Stop editing the project item */
  onCancel(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onCancel", "Cancel");
    this.reset();
    this.pService.select(this.editItem);  
    this.pService.edit();
  }

  /** Setup component(s) for adding a new project item. */
  onAdd(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onAdd", "Add");
    // Deselct all project items
    this.reset();
    this.pService.select(this.editItem);  
    this.pService.edit();
  }

  /** Setup component(s) for editing project item. */
  onEdit(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onEdit", "Edit");

    this.inTitle  = this.editItem.title;
    this.inDescn  = this.editItem.descn;
    this.inEffort = this.editItem.effort.toString();

    this.pService.edit();
  }

  /** Clear local storage and fire 'delete' event. */
  onDelete(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onDelete", "Delete");
    this.lss.clearData();
    this.delete.emit();
  }

  /** Clear the component of any items currently being edited, and off the local storage data. */
  reset(): void {
    this.editItem = {pid: 0, title: "", descn: "", effort: 0, selected: false, file: null};
    this.inTitle  = this.editItem.title;
    this.inDescn  = this.editItem.descn;
    this.inEffort = "";
    this.inFile = this.editItem.file;   
    this.lss.clearData();
  }  

}
