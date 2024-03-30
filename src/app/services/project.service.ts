import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, EMPTY, catchError, throwError } from 'rxjs';
import { project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private serverUrl: string        = 'http://localhost:3000/';
  private subject:   Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.serverUrl + "projectlist").pipe(catchError(this.handleError));
  }

  addProject(inTitle: string, inDescn: string, inEffort: string): Observable<any> {
    return this.http.post(this.serverUrl + "addProject", {title:  inTitle, 
                                                          descn:  inDescn, 
                                                          effort: inEffort})
                                                        .pipe(catchError(this.handleError));
  }

  deleteProjects(toDelete: project[]): Observable<any> {
    return this.http.post(this.serverUrl + "deleteProjects", {toDelete})
                                                        .pipe(catchError(this.handleError));
  }

  handleError(response: any): Observable<never> {
    let errMsg: string = '';
    errMsg = response.error.message;
    console.log(response);
    return throwError(() => {
      return errMsg;
    });
  }

  refresh(): void {
    this.subject.next();
  }

  onRefresh(): Observable<void> {
    return this.subject.asObservable();
  }

}
