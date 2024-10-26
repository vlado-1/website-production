import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { LocalStorageService } from '../services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileuploadComponent {
  public assetPath: string = environment.assets;

  /** Keep track of the name of the file which was last selected. */
  public fileName: string | null = null;

  constructor (private pService: ProjectService, private lss: LocalStorageService) {}

  /**
   * When a file is selected from file input button
   * save the file information into local storage
   * and fill the edit with file content.
   * 
   * @param {Event} event File select event
   * @returns {void} 
   */
  onFileSelected(event: Event): void {
    var htmlInputFiles: HTMLInputElement = event.target as HTMLInputElement;
    var fileReader: FileReader = new FileReader();

    if (htmlInputFiles.files != null) {
      this.fileName = htmlInputFiles.files[0].name;
      
      fileReader.readAsText(htmlInputFiles.files[0], "UTF-8");      
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        if (event != null && event.target != null && event.target.result != null) {
          this.lss.saveData("File", event.target.result.toString());
          this.pService.updateEditorContent();
        }
      };
    }
  }
}
