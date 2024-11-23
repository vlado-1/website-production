import { Component } from '@angular/core';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { project } from '../../types/project.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-mdeditor',
  standalone: true,
  imports: [FormsModule, LMarkdownEditorModule, FileuploadComponent],
  templateUrl: './mdeditor.component.html',
  styleUrl: './mdeditor.component.css'
})
export class MdeditorComponent {

  /** Editor text */
  public content: string | null = "";
  /** Either 'editor' or 'preview' */
  public mode: string = "editor";
  /** Configuration for editor */
  public options: MdEditorOption = {  
    showPreviewPanel: false,    // Show preview panel, Default is true
    resizable: false,           // Allow resize the editor
    enablePreviewContentClick: true,
    hideIcons: ['FullScreen'] // full screen is a little buggy so don't give user the option
  };
  /** Whether user is logged in */
  public loggedIn: boolean = false;

  /** After the editor has been initialized, check whether the user is logged in to
   *  determine whether to enable (logged) or disable (not logged in) it.
   */
  public ngAfterViewInit(): void {
    // After editor has been loaded, disable it if not logged in.
    var toolbar: HTMLElement = <HTMLElement>document.getElementsByClassName("tool-bar")[0];
    this.loggedIn = this.authService.getLoginStatus();
    if (!this.loggedIn) {
      toolbar.style.pointerEvents = "none";
      toolbar.style.opacity       = "0.4";
      this.fullPreview();
    }
    else {
      toolbar.style.pointerEvents = "auto";
      toolbar.style.opacity       = "1";
      this.closePreview();
    }
  }

  /** Initialize the editor content and subscribe to the project item select, editor content update 
   *  and local storage observables. */
  constructor (private pService: ProjectService, private lss: LocalStorageService, private authService: AuthenticationService) {
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

    this.lss.onStore().subscribe((key: string) => {
      if (key == "login") {
        this.loggedIn = authService.getLoginStatus();
      }
    });
  }

  /** Fires before content in editor is rendered, to keep local storage 
   *  updated with the editors content. */
  public preRenderFunc: Function = (inContent: string): string => {
    this.lss.saveData("File", inContent);
    return inContent;
  }
  public postRenderFunc(inContent: string): string {
    return inContent;
  }

  /**  
   * Click event handler to toggle whether to display a text editor or preview screen.
   * Check if certain icons were clicked, and then determine if text editor or preview 
   * screen is required. Preview screen must take up full space of editor.
   * 
   * @param {Event} event Click event
   * @returns {void}
  */
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

  /** Hide editor and display full preview. */
  private fullPreview(): void {
    // Replace text editor with preview, and fix preview width to 50vh
    var editorContainer: HTMLElement = <HTMLElement>document.getElementsByClassName("editor-container")[0];
    var editSection: HTMLElement = <HTMLElement>editorContainer.firstElementChild;
    var previewSection: HTMLElement = <HTMLElement>editorContainer.lastElementChild;

    editSection.style.display = "none";
    previewSection.style.display = "block"
    previewSection.style.width = "50vh";
  }

  /** Hide preview and show editor. */
  private closePreview(): void {
    var editorContainer: HTMLElement = <HTMLElement>document.getElementsByClassName("editor-container")[0];
    var editSection: HTMLElement = <HTMLElement>editorContainer.firstElementChild;
    var previewSection: HTMLElement = <HTMLElement>editorContainer.lastElementChild;

    editSection.style.display = "block";
    previewSection.style.display = "none"
  }
}
