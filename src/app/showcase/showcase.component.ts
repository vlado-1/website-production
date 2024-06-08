import { Component } from '@angular/core';
import { MdeditorComponent } from '../mdeditor/mdeditor.component';
import { MarkdownComponent } from 'ngx-markdown';
import { ProjectService } from '../services/project.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MarkdownComponent, MdeditorComponent, NgIf],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {

  public editMode: boolean = false;

  constructor (private pService: ProjectService) {
    this.pService.onEdit().subscribe(() => {
      this.editMode = !this.editMode;
    });

  }

  public onClick() {
    this.pService.edit();
  }

}
