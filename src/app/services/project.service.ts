import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private serverUrl: string        = 'http://localhost:3000/';
  private subject:   Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "getProjects", "GET " + this.serverUrl + "projectlist");
    return this.http.get(this.serverUrl + "projectlist").pipe(catchError(this.handleError));
  }

  addProject(inTitle: string, inDescn: string, inEffort: string, inFile: File | null): Observable<any> {    
    console.debug("%s: %s | %s", "ProjectService", "addProject", "POST " + this.serverUrl + "addProject");
    console.debug({title:  inTitle, 
      descn:  inDescn, 
      effort: inEffort,
      upload: inFile});

    return this.http.post(this.serverUrl + "addProject", this.getFormData({pid: 0,
                                                          title:  inTitle, 
                                                          descn:  inDescn, 
                                                          effort: Number(inEffort),
                                                          selected: true,
                                                          upload: inFile}))
                                                        .pipe(catchError(this.handleError));
  }

  deleteProjects(toDelete: project[]): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "deleteProjects", "POST " + this.serverUrl + "deleteProjects");
    console.debug(toDelete);
    return this.http.post(this.serverUrl + "deleteProjects", {toDelete})
                                                        .pipe(catchError(this.handleError));
  }

  updateProject(toEdit: project): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "updateProject", "POST " + this.serverUrl + "updateProject");
    console.debug(toEdit);

    return this.http.post(this.serverUrl + "updateProject", this.getFormData(toEdit))
                                                        .pipe(catchError(this.handleError));
  }

  handleError(response: any): Observable<never> {
    let errMsg: string = '';
    errMsg = response.error.message;
    console.debug("%s: %s | %s", "ProjectService", "handleError", errMsg);
    return throwError(() => {
      return errMsg;
    });
  }

  getFormData( data: project ): FormData {

    /* Default encoding type is "multipart/form-data" */
    var formData: FormData = new FormData();

    formData.append("pid", data.pid.toString());
    formData.append("title", data.title);
    formData.append("descn", data.descn);
    formData.append("effort", data.effort.toString());

    if (data.upload != null) {
      formData.append("upload", data.upload);
    }

    return formData;
  }

  refresh(): void {
    console.debug("%s: %s | %s", "ProjectService", "refresh", "Refresh broadcast");
    this.subject.next();
  }

  onRefresh(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onRefresh", "Refresh observable");
    return this.subject.asObservable();
  }

}
