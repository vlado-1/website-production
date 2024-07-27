import { Component } from '@angular/core';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { LocalStorageService } from '../services/local-storage.service';
import { FileuploadComponent } from '../fileupload/fileupload.component';

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
    enablePreviewContentClick: true
  };

  constructor (private pService: ProjectService, private lss: LocalStorageService) {
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
    var editorContainer: HTMLElement = <HTMLElement>document.getElementsByClassName("editor-container")[0];
    var editSection: HTMLElement = <HTMLElement>editorContainer.firstElementChild;
    var previewSection: HTMLElement = <HTMLElement>editorContainer.lastElementChild;

    /* eye icon - means editor in preview state currently
       eye-slash - means editor in normal state
       TO DO: replace text eith preview in preview mode, and don't let preview expand alot */
    if (clickedHTMLElement.className == "fa fa-eye") {
      editSection.style.display = "none";
      previewSection.style.display = "block"
      previewSection.style.width = "50vh";
    }
    else if (clickedHTMLElement.className == "fa fa-eye-slash") {
      editSection.style.display = "block";
      previewSection.style.display = "none"
    }
    else if (clickedHTMLElement.className.includes("btn")) {
      clickedHTMLElement = <HTMLElement>clickedHTMLElement.firstElementChild;
      
      if (clickedHTMLElement.className == "fa fa-eye") {
        editSection.style.display = "none";
        previewSection.style.display = "block";
        previewSection.style.width = "50vh";
      }
      else if (clickedHTMLElement.className = "fa fa-eye-slash") {
        editSection.style.display = "block";
        previewSection.style.display = "none";
      }
    }
  }
}
