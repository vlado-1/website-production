import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileuploadComponent {

  public fileName: string | null = null;

  constructor (private pService: ProjectService) {}

  onFileSelected(event: Event): void {
    var htmlInputFiles: HTMLInputElement = event.target as HTMLInputElement;
    var fileReader: FileReader = new FileReader();

    if (htmlInputFiles.files != null) {
      this.fileName = htmlInputFiles.files[0].name;
      
      fileReader.readAsText(htmlInputFiles.files[0], "UTF-8");      
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        if (event != null && event.target != null && event.target.result != null) {
          this.pService.upload(event.target.result.toString());
        }
      };
    }
  }
}
