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

  public editMode: boolean = false;
  public loggedIn: boolean = false;

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

  public onClick() {
    this.pService.edit();
  }

}
