import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from '../models/Rating.model';
import { MovieListService } from '../services/movie-list.service';
import { RatingService } from '../services/rating.service';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RatingEdit } from '../models/RatingEdit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  fileAddress: SafeUrl = "";
  Movies: Movie = {
    id: 0,
    sourceFileName: '',
    ratings: [],
    createdAt: new Date,
    modifiedAt: new Date,
    owner: '',
    tags: []
  }
  Ratings: RatingEdit = {
    id: 0,
    value: 0
  }
  
  constructor(private movieService: MovieListService, private ratingservice: RatingService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
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
    )}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.movieService.GetMovie(id)
          .subscribe({
            next: (response) => {
              this.Movies = response;
            }
          })
          this.ratingservice.GetRatingMovie(id)
          .subscribe({
            next: (response) => {
              this.Ratings = response;
            }
          })
        }
      }
    })
    
  }
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}
