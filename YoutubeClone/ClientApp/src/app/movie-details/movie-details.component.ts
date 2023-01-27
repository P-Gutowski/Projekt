import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { Rating } from '../models/Rating.model';
import { MovieListService } from '../services/movie-list.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  Movies: Movie = {
    id: 4,
    sourceFileName: '',
    ratings: [],
    createdAt: new Date,
    modifiedAt: new Date,
    owner: '',
    tags: []
  }
  Ratings: Rating = {
    id: 0,
    owner: undefined,
    movie: undefined,
    value: 0
  }
  constructor(private movieService: MovieListService, private ratingservice: RatingService) { }

  ngOnInit(): void {
    this.movieService.GetMovie(this.Movies.id)
    .subscribe({
      next: (Movies) => {
        console.log(Movies)
      },
      error: (response) => {
        console.log(response);
      }
    })
    this.ratingservice.GetRating(this.Movies.id).subscribe({
      next:()
    })
  }
}