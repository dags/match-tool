import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../config/app.settings';
import {ORSPQuestions} from './orspquestions';

@Injectable()
export class OntologyService {

    constructor(private http: Http) {
    }

    match(matchObject: string):  Observable<Response> {
       let headers = new Headers();
       headers.append('Content-Type', 'application/json');
       return this.http.post(AppSettings.ONTOLOGY_ENDPOINT + "/match", matchObject, {
            headers: headers
        });
      
    }
    
    autocomplete(partialRequest: string):Observable<Response> {
         let headers = new Headers();
         headers.append('Content-Type', 'application/json');
         return this.http.get(AppSettings.ONTOLOGY_ENDPOINT + "/autocomplete?q="+partialRequest,  {
            headers: headers});
    }

    
}