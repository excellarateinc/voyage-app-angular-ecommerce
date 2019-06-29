import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileDownloadService {

  constructor(private httpClient: HttpClient) { }

  downloadFile(url: string, filename: string): void {
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(blob => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // If browser is IE
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return 'no-url';
      }

      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);

      a.href = objectUrl;
      a.download = filename;
      a.click();

      document.body.removeChild(a);
      return url;
    });
  }
}
