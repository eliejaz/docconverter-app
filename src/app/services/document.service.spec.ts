import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentService } from './document.service';

describe('DocumentService', () => {
  let service: DocumentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentService]
    });
    service = TestBed.inject(DocumentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload a document', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    service.uploadDocument(file).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/documents/upload`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get conversion status', () => {
    const conversionId = '1234';
    service.getConversionStatus(conversionId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/conversions/status/${conversionId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should download a converted file', () => {
    const conversionId = '1234';
    service.downloadConvertedFile(conversionId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/conversions/download/${conversionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(new Blob(), { status: 200, statusText: 'OK' });
  });

  it('should get all files', () => {
    service.getAllFiles().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/documents/files`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should convert PDF to DOCX', () => {
    const fileName = 'test.pdf';
    service.convertPdfToDocx(fileName).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/conversions/convert/pdf-to-word?fileName=${fileName}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should convert DOCX to PDF', () => {
    const fileName = 'test.docx';
    service.convertWordToPdf(fileName).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/conversions/convert/word-to-pdf?fileName=${fileName}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
