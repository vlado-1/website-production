import { Component, Input } from '@angular/core';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import fs from 'fs';

@Component({
  selector: 'app-mdeditor',
  standalone: true,
  imports: [FormsModule, LMarkdownEditorModule],
  templateUrl: './mdeditor.component.html',
  styleUrl: './mdeditor.component.css'
})
export class MdeditorComponent {

  @Input()
  public content: string | null = "";
  public mode: string = "Editor";
  public options: MdEditorOption = {  
    showPreviewPanel: false,    // Show preview panel, Default is true
    resizable: true             // Allow resize the editor
  };

  constructor (private pService: ProjectService) {
    pService.onCollectEditorData().subscribe(() => {
      var newFilePath: string = "../temp/" + Date.now().toString() + ".md";
      if (this.content != null) {
        fs.writeFileSync(newFilePath, this.content);
        alert(newFilePath);
        this.pService.upload(getFile(newFilePath));
      }
    });
  }

  public preRenderFunc(inContent: string): string {
    return inContent;
  }
  public postRenderFunc(inContent: string): string {
    return inContent;
  }
  public onEditorLoaded(aceEditor: any): void {
  }
  public onPreviewDomChanged(htmlElement: HTMLElement): void{}

}
