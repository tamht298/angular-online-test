import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api/subjects';
  constructor(private http: HttpClient) { }
  getSubject(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
}
