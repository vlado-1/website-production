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

  public uploadFile: File | null = null;

  constructor (private pService: ProjectService) {}

  onFileSelected(event: Event): void {
    var htmlInputFiles: HTMLInputElement = event.target as HTMLInputElement;

    if (htmlInputFiles.files != null) {
      this.uploadFile = htmlInputFiles.files[0];
    }
    else {
      this.uploadFile = null;
    }

    if (this.uploadFile != null) {
      this.pService.upload(this.uploadFile);
    }
  }
}
