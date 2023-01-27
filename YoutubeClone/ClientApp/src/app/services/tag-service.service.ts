import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagAdd } from '../models/TagAdd.model';
import {Tag} from './../models/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagServiceService {
  baseApiUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string){this.baseApiUrl = baseUrl}

  GetTag(id: string): Observable<Tag>{
    return this.http.get<Tag>(this.baseApiUrl + 'Tags/Details/' + id);
  }
  
  Index(): Observable<Tag[]>{
    console.log(this.baseApiUrl)
    return this.http.get<Tag[]>(this.baseApiUrl + 'Tags')  
  }
  Create(tagadd: TagAdd): Observable<TagAdd>{
    return this.http.post<TagAdd>(this.baseApiUrl + 'Tags/Create', tagadd)
  }
  Edit(id: number, updatetagmethod: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.baseApiUrl + 'Tags/Edit/' + id, updatetagmethod)
  }
  Delete(id: number) {
    return this.http.delete(this.baseApiUrl + 'Tags/Delete/' + id)
  }
}
