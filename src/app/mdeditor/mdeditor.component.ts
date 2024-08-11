import { Component } from '@angular/core';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { LocalStorageService } from '../services/local-storage.service';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-mdeditor',
  standalone: true,
  imports: [FormsModule, LMarkdownEditorModule, FileuploadComponent],
  templateUrl: './mdeditor.component.html',
  styleUrl: './mdeditor.component.css'
})
export class MdeditorComponent {

  public content: string | null = "";
  public mode: string = "editor";
  public options: MdEditorOption = {  
    showPreviewPanel: false,    // Show preview panel, Default is true
    resizable: false,             // Allow resize the editor
    enablePreviewContentClick: true,
    hideIcons: ['FullScreen'] // full screen is a little buggy so don't give user the option
  };
  public loggedIn: boolean = false;

  constructor (private pService: ProjectService, private lss: LocalStorageService, private authServic: AuthenticationService) {
    this.content = lss.getData("File");

    this.pService.onSelect().subscribe((data: project) => {
      if (data.selected && data.file != null) {
        this.content = data.file;
      }
      else {
        this.content = null;
      }
    });

    this.pService.onUpdateEditorContent().subscribe(() => {
      this.content = lss.getData("File");
    });

    this.authServic.onLogin().subscribe((status: boolean) => {
      var toolbar: HTMLElement = <HTMLElement>document.getElementsByClassName("tool-bar")[0];
      
      if (status) {
        this.loggedIn = status;
        toolbar.style.pointerEvents = "auto";
        toolbar.style.opacity       = "1";
        this.closePreview();
      }
      else {
        // Disable editor toolbar and set to preview only mode if not logged in
        this.loggedIn = status;
        toolbar.style.pointerEvents = "none";
        toolbar.style.opacity       = "0.4";
        this.fullPreview();
      }
    });
  }

  public preRenderFunc: Function = (inContent: string): string => {
    this.lss.saveData("File", inContent);
    return inContent;
  }
  public postRenderFunc(inContent: string): string {
    return inContent;
  }
  public togglePreview(event: Event): void {
    var clickedHTMLElement: HTMLElement = <HTMLElement>event.target;

    /* eye icon - if clicked means editor should go to preview state
       eye-slash - if clicked means editor should go to normal state */
    if (clickedHTMLElement.className == "fa fa-eye") {
      this.fullPreview();
    }
    else if (clickedHTMLElement.className == "fa fa-eye-slash") {
      this.closePreview();
    }
    else if (clickedHTMLElement.className.includes("btn")) {
      clickedHTMLElement = <HTMLElement>clickedHTMLElement.firstElementChild;
      
      if (clickedHTMLElement.className == "fa fa-eye") {
        this.fullPreview();
      }
      else if (clickedHTMLElement.className = "fa fa-eye-slash") {
        this.closePreview();
      }
    }
  }

  private fullPreview(): void {
    // Replace text editor with preview, and fix preview width to 50vh
    var editorContainer: HTMLElement = <HTMLElement>document.getElementsByClassName("editor-container")[0];
    var editSection: HTMLElement = <HTMLElement>editorContainer.firstElementChild;
    var previewSection: HTMLElement = <HTMLElement>editorContainer.lastElementChild;

    editSection.style.display = "none";
    previewSection.style.display = "block"
    previewSection.style.width = "50vh";
  }

  private closePreview(): void {
    var editorContainer: HTMLElement = <HTMLElement>document.getElementsByClassName("editor-container")[0];
    var editSection: HTMLElement = <HTMLElement>editorContainer.firstElementChild;
    var previewSection: HTMLElement = <HTMLElement>editorContainer.lastElementChild;

    editSection.style.display = "block";
    previewSection.style.display = "none"
  }
}
