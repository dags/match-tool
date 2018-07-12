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
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', 'Basic ' + btoa(AppSettings.USERNAME + ':' + AppSettings.PASSWORD));
    return this.http.post(AppSettings.ONTOLOGY_ENDPOINT + '/match', matchObject, { headers: headers });

  }

  translate_dar(darInfo): Observable<any> {
    // https://consent-ontology.dsde-dev.broadinstitute.org/schemas/data-use/dar/translate
    let headers = new HttpHeaders();
    // headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', 'Basic ' + btoa(AppSettings.USERNAME + ':' + AppSettings.PASSWORD));
    return this.http.post(AppSettings.ONTOLOGY_ENDPOINT + '/schemas/data-use/dar/translate', darInfo, { headers: headers });
  }

  translate_dul(dulInfo): Observable<any> {
    // https://consent-ontology.dsde-dev.broadinstitute.org/schemas/data-use/consent/translate
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const options = {headers: headers };
    return this.http.post(AppSettings.ONTOLOGY_ENDPOINT + '/schemas/data-use/consent/translate', dulInfo, options);
  }

  autocomplete(partialRequest: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', 'Basic ' + btoa(AppSettings.USERNAME + ':' + AppSettings.PASSWORD));
    return this.http.get(AppSettings.ONTOLOGY_ENDPOINT + '/autocomplete?q=' + partialRequest, { headers: headers });
  }

}
