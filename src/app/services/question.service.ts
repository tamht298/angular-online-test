import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api/questions';
  constructor(private http: HttpClient) { }
  getQuestions():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
  createQuestion(question: any): Observable<any>{
    return this.http.post<any>(this.baseUrl, question).pipe(map((data: any) => data.result));
  }
  deleteQuestion(question: Question): Observable<any>{
    return this.http.put(this.baseUrl, question);

  }
}
