
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Movie } from '../models/Movie.model'
import { MovieAdd } from '../models/MovieAdd.model';


@Injectable({
  providedIn: 'root'
})

export class MovieListService {
  baseApiUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string){this.baseApiUrl = baseUrl}

  Index(): Observable<Movie[]>{
    console.log(this.baseApiUrl)
    return this.http.get<Movie[]>(this.baseApiUrl + 'Movies')

  }
  Create(addMovie: MovieAdd): Observable<MovieAdd>{
    return this.http.post<MovieAdd>(this.baseApiUrl + 'Movies/Create', addMovie)
  }
  GetMovie(id: string): Observable<Movie>{
    return this.http.get<Movie>(this.baseApiUrl + 'Movies/Details/' + id);
  }
  Edit(id: number, updateMovieMethod: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.baseApiUrl + 'Movies/Edit/' + id, updateMovieMethod)
  }
  Delete(id: number) {
    return this.http.delete(this.baseApiUrl + 'Movies/Delete/' + id)
  }
} 
