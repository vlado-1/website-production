import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { project } from '../models/project.model';
import { handleError } from '../util/ErrorHandlerREST';
import { getFormData } from '../util/FormWrapper';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private serverUrl:                   string                 = 'http://localhost:3000/';
  private refreshSubject:              Subject<void>          = new Subject<void>();
  private selectSubject:               Subject<project>       = new Subject<project>();
  private editSubject:                 Subject<void>          = new Subject<void>();
  private updateEditorContentSubject:  Subject<void>          = new Subject<void>();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "getProjects", "GET " + this.serverUrl + "projectlist");
    return this.http.get(this.serverUrl + "projectlist").pipe(catchError(handleError));
  }

  addProject(inTitle: string, inDescn: string, inEffort: string, inFile: string | null): Observable<any> {    
    console.debug("%s: %s | %s", "ProjectService", "addProject", "POST " + this.serverUrl + "addProject");
    console.debug({title:  inTitle, 
      descn:  inDescn, 
      effort: inEffort,
      file: inFile});

    return this.http.post(this.serverUrl + "addProject", getFormData({pid: 0,
                                                          title:  inTitle, 
                                                          descn:  inDescn, 
                                                          effort: Number(inEffort),
                                                          selected: true,
                                                          file: inFile}))
                                                        .pipe(catchError(handleError));
  }

  deleteProjects(data: project[]): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "deleteProjects", "POST " + this.serverUrl + "deleteProjects");
    console.debug(data);
    return this.http.post(this.serverUrl + "deleteProjects", {data})
                                                        .pipe(catchError(handleError));
  }

  updateProject(data: project): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "updateProject", "POST " + this.serverUrl + "updateProject");
    console.debug(data);

    return this.http.post(this.serverUrl + "updateProject", getFormData(data))
                                                        .pipe(catchError(handleError));
  }

  refresh(): void {
    console.debug("%s: %s | %s", "ProjectService", "refresh", "Refresh broadcast");
    this.refreshSubject.next();
  }

  onRefresh(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onRefresh", "Refresh observable");
    return this.refreshSubject.asObservable();
  }

  select(inSelected: project): void {
    console.debug("%s: %s | %s", "ProjectService", "select", "Select broadcast");
    this.selectSubject.next(inSelected);    
  }

  onSelect(): Observable<project> {
    console.debug("%s: %s | %s", "ProjectService", "onSelect", "Select observable");
    return this.selectSubject.asObservable();
  }

  edit(): void {
    console.debug("%s: %s | %s", "ProjectService", "edit", "Edit broadcast");
    this.editSubject.next();    
  }

  onEdit(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onEdit", "Edit observable");
    return this.editSubject.asObservable();
  }

  updateEditorContent(): void {
    console.debug("%s: %s | %s", "ProjectService", "upload", "Update Local Storage broadcast");
    this.updateEditorContentSubject.next();
  }

  onUpdateEditorContent(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onUpload", "Update LocalStorage observable");
    return this.updateEditorContentSubject.asObservable();
  }
}
