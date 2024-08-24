import { Component } from '@angular/core';
import { MdeditorComponent } from '../mdeditor/mdeditor.component';
import { MarkdownComponent } from 'ngx-markdown';
import { ProjectService } from '../services/project.service';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MarkdownComponent, MdeditorComponent, NgIf],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {

  public editMode: boolean = false;
  public holder: string = "Click to View";

  constructor (private pService: ProjectService, private authService: AuthenticationService) {
    this.pService.onEdit().subscribe(() => {
      this.editMode = !this.editMode;
    });

    if (this.authService.getLoginStatus()) {
      this.holder = "Click to Edit";
    }
    else {
      this.holder = "Click to View";
    }
  }

  public onClick() {
    this.pService.edit();
  }

}
