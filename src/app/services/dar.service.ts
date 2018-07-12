import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../models/app.settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarService {

  constructor(private http: HttpClient) {
  }

  getUseRestriction(questions: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(AppSettings.USERNAME + ':' + AppSettings.PASSWORD));
    return this.http.put(AppSettings.DAR_USERESTRICTION_ENDPOINT, questions, {
      headers: headers
    });
  }

}
