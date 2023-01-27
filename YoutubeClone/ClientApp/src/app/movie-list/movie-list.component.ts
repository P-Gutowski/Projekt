import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/Movie.model';
import { MovieListService } from '../services/movie-list.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  Movies: Movie[] = [];
  constructor(private movieService: MovieListService) { }

  ngOnInit(): void {
    this.movieService.Index()
    .subscribe({
      next: (Movies) => {
        console.log(Movies)
        this.Movies = Movies;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}
