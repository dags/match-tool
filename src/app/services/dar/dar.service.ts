import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../config/app.settings';


@Injectable()
export class DARService {

    constructor(private http: Http) {
    }


    getUseRestriction(questions: string): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(AppSettings.USERNAME + ':' + AppSettings.PASSWORD))
        return this.http.put(AppSettings.DAR_USERESTRICTION_ENDPOINT, questions, {
            headers: headers
        });
    }
     

}
