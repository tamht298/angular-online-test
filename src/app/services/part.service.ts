import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  getQuestionsByPartId(id: number): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.baseUrl}/parts/${id}/questions`)
  }
  getPartBySubjectId(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/${id}/parts`);
  }
}
