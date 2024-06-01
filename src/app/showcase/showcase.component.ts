import { Component } from '@angular/core';
import { MdeditorComponent } from '../mdeditor/mdeditor.component';
import { MarkdownComponent } from 'ngx-markdown';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MarkdownComponent, MdeditorComponent, NgIf],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {

  public content: string | null = null;
  public editMode: boolean = false;

  constructor (private pService: ProjectService) {
    this.pService.onSelect().subscribe((selection: project) => {
      if (selection.selected) {
        if (selection.fileId != null) {
          this.pService.getFile(selection.fileId).subscribe(data => {
            this.content = data.toString();
          });
        }
        else {
          this.content = "";
        }
      }
      else {
        this.content = null;
      }
    });

    this.pService.onEdit().subscribe(() => {
      this.editMode = !this.editMode;
    });
  }

  public onClick() {
    this.pService.edit();
  }

}
