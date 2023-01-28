import { Component, Inject, Sanitizer } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-test-video-stream-component',
  templateUrl: './test-video-stream.component.html'
})
export class TestVideoStreamComponent {
  fileAddress: SafeUrl = "";

  constructor(private sanitizer: DomSanitizer, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    const headers = new HttpHeaders();
    const fileName = "videoFile";
    http.get(baseUrl + 'movies/streamtestvideofile', {headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) => {
            const dataType = response.type;
            let binaryData = [];
            binaryData.push(response);

            const url = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            this.fileAddress = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    )
    
  }
}
