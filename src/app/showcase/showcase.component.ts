import { Component } from '@angular/core';
import { MdeditorComponent } from '../mdeditor/mdeditor.component';
import { MarkdownComponent } from 'ngx-markdown';
import { ProjectService } from '../services/project.service';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MarkdownComponent, MdeditorComponent, NgIf],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {

  /** Whether editor is in edit mode */
  public editMode: boolean = false;
  /** Whether user is logged in */
  public loggedIn: boolean = false;

  /** Subscribe to edit and local storage Subjects */
  constructor (private pService: ProjectService, private authService: AuthenticationService, private lss: LocalStorageService) {
    this.pService.onEdit().subscribe(() => {
      this.editMode = !this.editMode;
    });
    
    this.lss.onStore().subscribe((key: string) => {
      if (key == "login") {
        this.loggedIn = authService.getLoginStatus();
      }
    });
  }

  /** Clicking placeholder icon should fire edit Subject */
  public onClick() {
    this.pService.edit();
  }

}
