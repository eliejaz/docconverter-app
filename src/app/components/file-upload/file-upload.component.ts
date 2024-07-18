import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  progress: number = 0;

  constructor(private documentService: DocumentService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.documentService.uploadDocument(this.selectedFile).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete');
        }
      });
    }
  }
}
