import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private baseUrl='https://sv-web-trac-nghiem.herokuapp.com/api';
  constructor(private http: HttpClient) { }
  getParts(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
  getPartById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
  getPartBySubjectId(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/${id}/parts`);
  }
}
