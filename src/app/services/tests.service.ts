import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api/tests';
  constructor(private http: HttpClient) { }
  getTests(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
}
