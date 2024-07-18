import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { DocumentService } from '../../services/document.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let documentService: DocumentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatButtonModule
      ],
      declarations: [ DashboardComponent ],
      providers: [ DocumentService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    documentService = TestBed.inject(DocumentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load files on init', () => {
    const mockFiles = [{ originalName: 'test.pdf', status: 'UPLOADED' }];
    spyOn(documentService, 'getAllFiles').and.returnValue(of(mockFiles));

    fixture.detectChanges(); // ngOnInit()
    
    expect(component.files.length).toBe(1);
    expect(component.files).toEqual(mockFiles);
  });

  it('should call convertToDocx when button is clicked', () => {
    spyOn(component, 'convertToDocx');
    const mockFiles = [{ originalName: 'test.pdf', status: 'UPLOADED' }];
    spyOn(documentService, 'getAllFiles').and.returnValue(of(mockFiles));

    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.convertToDocx).toHaveBeenCalledWith(mockFiles[0]);
  });
});
