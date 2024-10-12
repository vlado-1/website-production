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

  /** Location of server */
  private serverUrl:                   string                 = 'http://localhost:3000/';
  
  private refreshSubject:              Subject<void>          = new Subject<void>();
  private selectSubject:               Subject<project>       = new Subject<project>();
  private editSubject:                 Subject<void>          = new Subject<void>();
  private updateEditorContentSubject:  Subject<void>          = new Subject<void>();

  /** Inject http service for communicating with server */
  constructor(private http: HttpClient) { }

  /** 
   * Returns all projects stored on the server.
   * (GET)
   * 
   * @returns {Observable<any>}
   */
  getProjects(): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "getProjects", "GET " + this.serverUrl + "projectlist");
    return this.http.get(this.serverUrl + "projectlist", { withCredentials: true }).pipe(catchError(handleError));
  }

  /** 
   * Add a new project to the server.
   * (POST)
   * 
   * @param {string} inTitle Title of project
   * @param {string} inDescn Short description of project
   * @param {string} inEffort Number of days spent on project
   * @param {string | null} inFile Text from edited file
   * 
   * @returns {Observable<any>}
   */
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
                                                          file: inFile}),
                                                          { withCredentials: true })
                                                        .pipe(catchError(handleError));
  }

  /** 
   * Delete provided projects from server.
   * (POST)
   * 
   * @param {project[]} data List of projects to delete
   * 
   * @returns {Observable<any>}
   */
  deleteProjects(data: project[]): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "deleteProjects", "POST " + this.serverUrl + "deleteProjects");
    console.debug(data);
    return this.http.post(this.serverUrl + "deleteProjects", {data}, { withCredentials: true })
                                                        .pipe(catchError(handleError));
  }

  /** 
   * Update project item on server
   * (POST)
   * 
   * @param {project} data Project with updated info
   * 
   * @returns {Observable<any>}
   */
  updateProject(data: project): Observable<any> {
    console.debug("%s: %s | %s", "ProjectService", "updateProject", "POST " + this.serverUrl + "updateProject");
    console.debug(data);

    return this.http.post(this.serverUrl + "updateProject", getFormData(data), { withCredentials: true })
                                                        .pipe(catchError(handleError));
  }

  /** Fire Refresh Subject */
  refresh(): void {
    console.debug("%s: %s | %s", "ProjectService", "refresh", "Refresh broadcast");
    this.refreshSubject.next();
  }

  /** Return Refresh Observable   */
  onRefresh(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onRefresh", "Refresh observable");
    return this.refreshSubject.asObservable();
  }

  /** Fire select Subject */
  select(inSelected: project): void {
    console.debug("%s: %s | %s", "ProjectService", "select", "Select broadcast");
    this.selectSubject.next(inSelected);    
  }

  /** Return select Observable   */
  onSelect(): Observable<project> {
    console.debug("%s: %s | %s", "ProjectService", "onSelect", "Select observable");
    return this.selectSubject.asObservable();
  }

  /** Fire edit Subject */
  edit(): void {
    console.debug("%s: %s | %s", "ProjectService", "edit", "Edit broadcast");
    this.editSubject.next();    
  }

  /** Return edit Observable   */
  onEdit(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onEdit", "Edit observable");
    return this.editSubject.asObservable();
  }

  /** Fire Editor Content update Subject */
  updateEditorContent(): void {
    console.debug("%s: %s | %s", "ProjectService", "upload", "Update Local Storage broadcast");
    this.updateEditorContentSubject.next();
  }

  /** Return Editor Content update Observable   */
  onUpdateEditorContent(): Observable<void> {
    console.debug("%s: %s | %s", "ProjectService", "onUpload", "Update LocalStorage observable");
    return this.updateEditorContentSubject.asObservable();
  }
}
