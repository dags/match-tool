import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../models/app.settings';

@Injectable({
  providedIn: 'root'
})
export class OntologyService {

  constructor(private http: HttpClient) {
  }

  match(matchObject: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppSettings.ONTOLOGY_ENDPOINT + '/match', matchObject, { headers: headers });

  }

  autocomplete(partialRequest: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(AppSettings.ONTOLOGY_ENDPOINT + '/autocomplete?q=' + partialRequest, { headers: headers });
  }

}
