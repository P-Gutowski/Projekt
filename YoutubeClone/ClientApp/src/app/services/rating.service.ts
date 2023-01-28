import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/Rating.model';
import { RatingAdd } from '../models/RatingAdd.model';
import { RatingEdit } from '../models/RatingEdit.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  baseApiUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string){this.baseApiUrl = baseUrl}

  GetRating(id: string): Observable<Rating>{
    return this.http.get<Rating>(this.baseApiUrl + 'Ratings/Details/' + id);
  }
  GetRatingMovie(id: string): Observable<RatingEdit>{
    return this.http.get<RatingEdit>(this.baseApiUrl + 'Ratings/DetailsMovie/' + id);
  }
  
  Index(): Observable<Rating[]>{
    console.log(this.baseApiUrl)
    return this.http.get<Rating[]>(this.baseApiUrl + 'Ratings')  
  }
  Create(ratingAdd: RatingAdd): Observable<RatingAdd>{
    return this.http.post<RatingAdd>(this.baseApiUrl + 'Ratings/Create', ratingAdd)
  }
  Edit(id: number, updateRatingMethod: RatingEdit["value"]): Observable<RatingEdit> {
    return this.http.put<RatingEdit>(this.baseApiUrl + 'Ratings/Edit/' + id, updateRatingMethod)
  }
  Delete(id: number) {
    return this.http.delete(this.baseApiUrl + 'Ratings/Delete/' + id)
  }
}
