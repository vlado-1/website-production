import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MarkdownComponent, NgIf],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {

  public fileName: string | null = null;

  constructor (private pService: ProjectService) {
    this.pService.onSelect().subscribe((selection: project) => {
      this.fileName = selection.fileId;
    });
  }

}
