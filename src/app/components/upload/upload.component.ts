import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.styl']
})
export class UploadComponent implements OnInit {
  fileToUpload: any;
  file = {
    data: File,
    inProgress: false,
    progress: 0
  };

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef | undefined;

  files  = [this.file];

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  upload(): void {
    const file = this.fileToUpload as File;
    this.uploadService.uploadFile(file);
  }

  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    this.fileToUpload = input.files[0];
  }
  private upload2(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
      this.files.forEach(file => {
        this.fileToUpload = file.data;
        const asFile = this.fileToUpload as File;
        if (asFile.name.endsWith('.csv') ||  asFile.name.endsWith('.xml')) {
          this.uploadService.uploadFile(asFile);
        }
      });
    }
  }

  onClick(): void {
    if (this.fileInput !== undefined) {
      const fileInput = this.fileInput.nativeElement as HTMLInputElement;
      if (fileInput.files) {
        const count = fileInput.files.length;
        for (let i = 0; i < count; i++) {
          this.fileToUpload = fileInput.files[i];
          console.log('FILE NAME == ' + this.fileToUpload.name);
          if (this.fileToUpload) {
            this.files.push({ data: this.fileToUpload, inProgress: false, progress: 0});
          }
        }
      }
      this.upload2();
      fileInput.click();
      fileInput.value = '';
    }
  }
}
