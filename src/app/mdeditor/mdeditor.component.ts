import { Component } from '@angular/core';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-mdeditor',
  standalone: true,
  imports: [FormsModule, LMarkdownEditorModule],
  templateUrl: './mdeditor.component.html',
  styleUrl: './mdeditor.component.css'
})
export class MdeditorComponent {

  public content: string | null = "";
  public mode: string = "Editor";
  public options: MdEditorOption = {  
    showPreviewPanel: false,    // Show preview panel, Default is true
    resizable: true             // Allow resize the editor
  };

  constructor (private pService: ProjectService, private lss: LocalStorageService) {
    this.pService.onSelect().subscribe((data: project) => {
      if (data.selected && data.file != null) {
        this.content = data.file;
      }
      else {
        this.content = null;
      }
    });

    this.pService.onUpdateLocalStore().subscribe(() => {
      if (lss.getData("File") != this.content) {
        this.content = lss.getData("File");
      }
    });
  }

  public preRenderFunc: Function = (inContent: string): string => {
    this.pService.updateLocalStore(inContent);
    return inContent;
  }
  public postRenderFunc(inContent: string): string {
    return inContent;
  }
  public onEditorLoaded(aceEditor: any): void {
  }
  public onPreviewDomChanged(htmlElement: HTMLElement): void{
  }
}
