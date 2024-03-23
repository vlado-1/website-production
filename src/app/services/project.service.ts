import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  serverUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.serverUrl + "projectlist").pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errMsg: string = '';
    errMsg = error.message;
    return throwError(() => {
      return errMsg;
    });
  }
}
