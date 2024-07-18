import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  uploadDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/documents/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getConversionStatus(conversionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversions/status/${conversionId}`);
  }

  downloadConvertedFile(conversionId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/conversions/download/${conversionId}`, {
      responseType: 'blob'
    });
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/documents/files`);
  }

  convertPdfToDocx(fileId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversions/convert/pdf-to-word`, { params: { fileId } });
  }

  convertWordToPdf(fileId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/conversions/convert/word-to-pdf`, { params: { fileId } });
  }
}
