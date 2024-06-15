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

  public pList: project[] = [];
  public selection: project = {pid: 0, title: "", descn: "", effort: 0, selected: false, file: null};

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

  public refreshList(): void {
    console.debug("%s: %s | %s", "ListComponent", "refreshList", "Refreshing");
    this.pService.getProjects().subscribe(result => {
      this.pList = result;
      });
  }

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

  public onDelete() {
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