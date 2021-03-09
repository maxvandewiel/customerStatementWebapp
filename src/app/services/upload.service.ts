import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://8fl4xpry7k.execute-api.eu-west-2.amazonaws.com/dev/customer/statement/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  preSignedResponse = {
    error: false,
    data: '',
    message: null
  };

  constructor(private httpClient: HttpClient) { }

  getPreSignedUrl(file: File): Observable<any> {
    return this.httpClient.get(`${baseURL}?key=${file.name}&contentType=${file.type}`);
  }

  uploadFileUsingPreSignedUrl(file: File): Observable<any> {
    return this.httpClient.put(this.preSignedResponse.data, file);
  }

  uploadFile(file: File): void {
    const preSigned = this.getPreSignedUrl(file)
      .subscribe(
        preSignedResponse => {
          this.preSignedResponse = preSignedResponse;
          console.log(preSignedResponse);
          this.uploadFileUsingPreSignedUrl(file)
            .subscribe(uploadResponse => {
              console.log('Successfully uploaded file ...');
            })
          ;
        },
        error => {
          console.log(error);
        });
  }
}
