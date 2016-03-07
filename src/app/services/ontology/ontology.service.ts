import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../config/app.settings';
import {ORSPQuestions} from './orspquestions';

@Injectable()
export class OntologyService {

    constructor(private http: Http) {
    }


    match(matchObject: string):  Observable<Response> {
        let headers = new Headers();
        var response : Object;
        headers.append('Content-Type', 'application/json');
       return this.http.post(AppSettings.ONTOLOGY_MATCH_ENDPOINT, matchObject, {
            headers: headers
        });
      
    }

    getUseRestriction(questions: ORSPQuestions): Observable<Response> {
     //   return this.http.get(AppSettings.PROCESSES_API_ENDPOINT + 'processes-api/process');
     return ;
    }

}
