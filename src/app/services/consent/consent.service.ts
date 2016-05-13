import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../config/app.settings';
import {DarQuestions} from './darquestions';

@Injectable()
export class ConsentService {

    constructor(private http: Http) {

    }

    getUseRestriction(questions: DarQuestions): Observable<Response> {
        return ;
    }

}
