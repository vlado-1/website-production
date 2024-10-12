import { Component } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ProjectService } from '../services/project.service';
import { project } from '../models/project.model';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, EditItemComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  /** List of project items. */
  public pList: project[] = [];
  /** Project item currently selected. Only 1 at a time can be selected. */
  public selection: project = {pid: 0, title: "", descn: "", effort: 0, selected: false, file: null};

  /** Fetch initial list of project items, and setup handlers for refresh and select observables.  */
  constructor( private pService: ProjectService, private lss: LocalStorageService) {
    this.refreshList();
    pService.onRefresh().subscribe(() => {
      console.debug("%s: %s | %s", "ListComponent", "Subscribe", "Refresh received");
      this.refreshList();
    });
    pService.onSelect().subscribe((selected: project) => {
      this.selection = selected;

      // Deselect all if no real project (pid = 0) selected
      if (selected.pid == 0) {
        this.pList = this.pList.map((item: project): project => {
          item.selected = false;
          return item;
          });
      }
    });
  }

  /**
   * Clear cache and re-fetch list of project items.
   * */
  public refreshList(): void {
    console.debug("%s: %s | %s", "ListComponent", "refreshList", "Refreshing");
    
    /* Clear local storage on refresh because LocalStorageService will be re-constructed
       With new keys and ivs causing subsequent local storage decryption to fail. */
    this.lss.clearData();
    
    this.pService.getProjects().subscribe(result => {
      this.pList = result;
      });
  }

  /** 
   * Find the given project item in the list, set its select status to true,
   * update the cache with that project's file data, and fire the select subject.
   * 
   * Note: Only one project can be selected at a time.
   * 
   * @param {project} listItem Selected project
   * @returns {void}
   * */
  public onSelect(listItem: project): void {
    console.debug("%s: %s | %s", "ListComponent", "onSelect", "Set selected attribute");

    this.pList = this.pList.map((item: project): project => {
                  // Beware - don't confuse ABL with javascript (a = b is NOT a comparison, a == b is)
                  if (item.pid == listItem.pid) {
                      item.selected = listItem.selected;
                    }
                  else {
                      item.selected = false;
                  }
                  return item;
                  });

    if (this.pList.filter(item => { return item.selected }).length == 1) {
      this.selection = this.pList.filter(item => { return item.selected })[0];
    }
    else {
      this.selection = {pid: 0, title: "", descn: "", effort: 0, selected: false, file: null};
    }

    if (this.lss.getData("File") == "") {
      if (this.selection.file != null) {
        this.lss.saveData("File", this.selection.file);
      }
    }

    this.pService.select(this.selection);

    console.debug("%s: %s | %o", "ListComponent", "onSelect", this.pList);
  }


  /** Get selected project item from list, and call service to delete it.
   *  On return of service refresh the project list, and don't select anything. */
  public onDelete():void {
    console.debug("%s: %s | %s", "ListComponent", "onDelete", "Delete");

    var selectedItems: project[] = this.pList.filter((item: project) => {
      return item.selected;
    });

    this.pService.deleteProjects(selectedItems).subscribe((response) => {
      console.debug("%s: %s | %s", "ListComponent", "Subscribe", "Delete finished");
      this.refreshList();

      this.selection = {pid: 0, title: "", descn: "", effort: 0, selected: false, file: null};
      this.pService.select(this.selection);
    });
  }
}