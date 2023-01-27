import { Component, OnInit } from '@angular/core';
import { MovieAdd } from '../models/MovieAdd.model';
import { ApplicationUser } from '../models/ApplicationUser.model';
import { MovieListService } from '../services/movie-list.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  appUser: ApplicationUser = [];
  addMovie: MovieAdd = {
    sourceFileName: ''
  }
  constructor(private addmovieService: MovieListService, private router: Router) { }

  ngOnInit(): void {
  }
  addMovieMethod(){
     this.addmovieService.Create(this.addMovie)
     .subscribe({
        next: (movie) => {
          console.log(movie)
          
        },
        error: (respone) => {
          console.log(respone)
        }
     });
  }

}
