import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classes } from '../models/classes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api/classes';

  constructor(private http: HttpClient) { }
  getClasses(): Observable<Classes[]>{
    return this.http.get<Classes[]>(this.baseUrl);
  }
}
