import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProjectviewComponent } from './pages/projectview/projectview.component';

export const routes: Routes = [
    {path: "", title:"Project One", component: ProjectviewComponent },
    {path: "about", title: "About", component: AboutComponent}
];
