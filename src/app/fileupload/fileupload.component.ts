import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileuploadComponent {

  public uploadFile: File | null = null;

  @Output()
  fileUpload: EventEmitter<File | null> = new EventEmitter<File | null>(); 

  onFileSelected(event: Event): void {
    var htmlInputFiles: HTMLInputElement = event.target as HTMLInputElement;

    if (htmlInputFiles.files != null) {
      this.uploadFile = htmlInputFiles.files[0];
    }
    else {
      this.uploadFile = null;
    }

    if (this.uploadFile != null) {
      this.fileUpload.emit(this.uploadFile);
    }
  }
}
