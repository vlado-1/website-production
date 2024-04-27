import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileuploadComponent {

  public uploadFiles: FileList | null = null;

  @Output()
  fileUpload: EventEmitter<FormData | null> = new EventEmitter<FormData | null>(); 

  onFileSelected(event: Event): void {
    var formData = new FormData();
    var htmlInputFiles: HTMLInputElement = event.target as HTMLInputElement;

    this.uploadFiles = htmlInputFiles.files;

    if (this.uploadFiles != null) {
      formData.append("File", this.uploadFiles[0]);
      this.fileUpload.emit(formData);
    }
  }
}
