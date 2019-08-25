import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionType } from '../models/question_type';

@Injectable({
  providedIn: 'root'
})
export class QuestiontypeService {

  baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api/questiontypes'
  constructor(private http: HttpClient) { }
  
  getTypes(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
  
}
