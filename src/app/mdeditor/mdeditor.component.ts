import { Component, SecurityContext } from '@angular/core';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mdeditor',
  standalone: true,
  imports: [FormsModule, LMarkdownEditorModule],
  templateUrl: './mdeditor.component.html',
  styleUrl: './mdeditor.component.css'
})
export class MdeditorComponent {

  public content: string = "";
  public mode: string = "Editor";
  public options: MdEditorOption = {  
    showPreviewPanel: false,    // Show preview panel, Default is true
    resizable: true             // Allow resize the editor
  };
  
  public doUpload(files: Array<File>): void {}
  public preRenderFunc(inContent: string): string {
    return inContent;
  }
  public postRenderFunc(inContent: string): string {
    return inContent;
  }
  public onEditorLoaded(aceEditor: any): void {}
  public onPreviewDomChanged(htmlElement: HTMLElement): void{}

}
