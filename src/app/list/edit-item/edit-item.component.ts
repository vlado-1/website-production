import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe,CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  // for emitter to work on parent, the event handler must be on component selector
  @Output()
  public delete: EventEmitter<void> = new EventEmitter<void>();

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
    console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save event");

    if (this.inTitle == "" && this.inDescn == "" && this.inEffort == "") {
      console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save aborted");
      return;
    }

    this.pService.addProject(this.inTitle, this.inDescn, this.inEffort).subscribe(
      (result: any) => {
        console.debug("%s: %s | %s", "EditItemComponent", "onSave", "Save observable activated");
      this.pService.refresh();
    });

    this.inTitle  = "";
    this.inDescn  = "";
    this.inEffort = "";
  }

  onCancel(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onCancel", "Canceled");
    this.addMode = !this.addMode;
  }

  onAdd(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onAdd", "Add Mode");
    this.addMode = !this.addMode;
  }

  onDelete(): void {
    console.debug("%s: %s | %s", "EditItemComponent", "onDelete", "Delete event");
    this.delete.emit();
  }
}
