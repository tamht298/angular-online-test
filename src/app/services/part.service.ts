import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private baseUrl='';
  constructor(private http: HttpClient) { }
  getParts(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
}
