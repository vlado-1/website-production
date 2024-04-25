import { Component } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css'
})
export class FileuploadComponent {

  public fileName: string = "";

  onFileSelected(event: Event): void {

    var htmlInputFiles: HTMLInputElement = event.target as HTMLInputElement;

    if (htmlInputFiles.files == null) {
      return;
    }

    console.log(htmlInputFiles.files[0]);

    if (htmlInputFiles.files && htmlInputFiles.files.length) {
      this.fileName = htmlInputFiles.files[0].name;
    }
  }
}
