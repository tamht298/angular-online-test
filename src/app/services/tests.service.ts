import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tests } from '../models/tests';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private baseUrl = 'https://sv-web-trac-nghiem.herokuapp.com/api/tests';

  constructor(private http: HttpClient) {
  }

  getTests(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  createTest(t: Tests): Observable<Tests>{
    return this.http.post<Tests>(this.baseUrl, t);
  }
}
