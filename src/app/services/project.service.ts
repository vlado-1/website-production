import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  serverUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.serverUrl + "projectlist").pipe(catchError(this.handleError));
  }

  handleError(error: any): string {
    return "Well something went wrong with the http request.";
  }
}
