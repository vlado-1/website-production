import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private serverUrl: string        = 'http://localhost:3000/';
  private refreshSubject:   Subject<void> = new Subject<void>();
  private selectSubject: Subject<project> = new Subject<project>();
  private editSubject: Subject<void> = new Subject<void>();
  private uploadSubject: Subject<File | null> = new Subject<File | null>();
  private collectEditorDataSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "getProjects", "GET " + this.serverUrl + "projectlist");
    return this.http.get(this.serverUrl + "projectlist").pipe(catchError(this.handleError));
  }

  getFile(inFileId: string | null): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "getFile", "GET " + this.serverUrl + "inFileId");
    return this.http.get(this.serverUrl + inFileId, {responseType: 'text' as 'json'}).pipe(catchError(this.handleError));
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
                                                          upload: inFile,
                                                          fileId: null}))
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

    if (data.fileId != null) {
      formData.append("fileId", data.fileId);
    }

    if (data.upload != null) {
      formData.append("upload", data.upload);
    }

    return formData;
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

  upload(toUpload: File | null): void {
    console.debug("%s: %s | %s", "ProjectService", "upload", "Upload broadcast");
    this.uploadSubject.next(toUpload);
  }

  onUpload(): Observable<File | null> {
    console.debug("%s: %s | %s", "ProjectService", "onUpload", "Upload observable");
    return this.uploadSubject.asObservable();
  }

  collectEditorData(): void {
    console.debug("%s: %s | %s", "ProjectService", "collectEditorData", "Collect editor data boadcast");
    this.collectEditorDataSubject.next();
  }

  onCollectEditorData(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onCollectEditorData", "Collect editor data observable");
    return this.collectEditorDataSubject.asObservable();
  }
}
