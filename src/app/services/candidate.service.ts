import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidatesUrl= 'https://sv-web-trac-nghiem.herokuapp.com/api/candidates';
  constructor(private http: HttpClient) { }
  getCandidates(): Observable<any[]>{
    return this.http.get<[]>(this.candidatesUrl);
  }
  getCandidateById(id: number): Observable<any>{
    return this.http.get(`${this.candidatesUrl}/${id}`);
  }
  createCandidate(candidate: Candidate): Observable<any>{
    return this.http.post(this.candidatesUrl, candidate).pipe(map((data: any) => data.result ));

  }
  updateCandidate(id: number, value: any): Observable<any>{
    return this.http.put(`${this.candidatesUrl}/${id}`, value);
  }
  deleteCandidate(id: number){
    return this.http.delete(`${this.candidatesUrl}/${id}`);
  }
  
}
