import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { WebSocketService } from '../../services/web-socket.service';
import { saveAs } from 'file-saver';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: any[] = [];
  displayedColumns: string[] = ['originalName', 'convertedName', 'status', 'actions'];

  constructor(
    private documentService: DocumentService,
    private webSocketService: WebSocketService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadFiles();

    this.webSocketService.getStatusUpdates().subscribe(status => {
      const index = this.files.findIndex(file => file.id === status.fileId);

      if (index !== -1) {
        this.files[index].status = status.newDocumentStatus;
        this.files[index].convertedName = status.convertedName;
        this.cdr.detectChanges();
      }
    });
  }

  loadFiles(): void {
    this.documentService.getAllFiles().subscribe(data => {
      this.files = data;
      this.cdr.detectChanges();
    });
  }

  convertToDocx(file: any): void {
    if (file.status === 'UPLOADED') {
      this.documentService.convertPdfToDocx(file.id).subscribe(response => {
        alert('Conversion to DOCX started');
        this.loadFiles();
      }, error => {
        alert('Conversion failed: ' + error.message);
      });
    } else {
      alert('File is not ready for conversion.');
    }
  }

  convertToPdf(file: any): void {
    if (file.status === 'UPLOADED') {
      this.documentService.convertWordToPdf(file.id).subscribe(response => {
        alert('Conversion to PDF started');
        this.loadFiles();
      }, error => {
        alert('Conversion failed: ' + error.message);
      });
    } else {
      alert('File is not ready for conversion.');
    }
  }

  downloadFile(file: any): void {
    if (file.status === 'COMPLETED') {
      this.documentService.downloadConvertedFile(file.conversionId).subscribe(blob => {
        saveAs(blob, file.convertedName);
      }, error => {
        alert('Download failed: ' + error.message);
      });
    } else {
      alert('File is not ready for download.');
    }
  }
}
