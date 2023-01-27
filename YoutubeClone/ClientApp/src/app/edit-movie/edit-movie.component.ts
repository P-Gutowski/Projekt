import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/Movie.model';
import { MovieListService } from '../services/movie-list.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  editMovie: Movie = {
    id: 0,
    sourceFileName: '',
    ratings: [],
    createdAt: new Date,
    modifiedAt: new Date,
    owner: '',
    tags: []
  }
  constructor(private route: ActivatedRoute, private movieService: MovieListService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.movieService.GetMovie(this.editMovie.id)
          .subscribe({
            next: (response) => {
              this.editMovie = response;
            }
          })
        }
      }
    })
  }

 EditMovieMethod() {
  this.movieService.Edit(this.editMovie.id, this.editMovie)
  .subscribe({
    next: (response) => {
      this.router.navigate(['movie-list'])
    }
  })
 }
 DeleteMovieMethod(id: number) {
  this.movieService.Delete(id)
  .subscribe({
    next: (response) => {
      this.router.navigate(['movie-list'])
    }
  })
 }

}
