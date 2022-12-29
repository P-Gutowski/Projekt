import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './counter.component.html'
})
export class TestVideoStreamComponent {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Blob>(baseUrl + 'movies/streamtestvideofile').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  downloadVideoMp4(url: string) {
    var RequestData = {
      url: url,
      type: 0
    }
    const headers = new HttpHeaders({
      'Content-Type': 'video/mp4',
      'Accept': 'video/mp4'
    });
    return this.http.get<Blob>(this.endpoint + url, { headers: headers, responseType: 'blob' as 'json' });
  }
}
