import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test-video-stream-component',
  templateUrl: './test-video-stream.component.html'
})
export class TestVideoStreamComponent {
  public videoFile: Blob = new Blob();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'video/mp4',
      'Accept': 'video/mp4'
    });

    http.get<Blob>(baseUrl + 'movies/streamtestvideofile').subscribe(result => {
        this.videoFile = result;
      }, error => console.error(error));
  }
}
