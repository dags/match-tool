import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DarQuestions } from '../models/darquestions';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  constructor(private http: HttpClient) {

  }

  getUseRestriction(questions: DarQuestions): Observable<Response> {
    return;
  }

}
