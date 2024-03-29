import { Component } from '@angular/core';
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
    console.log("Save");

    if (this.inTitle == "" && this.inDescn == "" && this.inEffort == "") {
      return;
    }

    this.pService.addProject(this.inTitle, this.inDescn, this.inEffort).subscribe(
      (result: any) => {
      console.log("Add project success");
      this.pService.refresh();
    });

    this.inTitle  = "";
    this.inDescn  = "";
    this.inEffort = "";
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
