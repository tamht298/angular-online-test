import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api/questions';
  constructor(private http: HttpClient) { }
  getQuestions():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
}
