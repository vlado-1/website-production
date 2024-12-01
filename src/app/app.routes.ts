import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProjectviewComponent } from './pages/projectview/projectview.component';
import { SubsetsumComponent } from './pages/subsetsum/subsetsum.component';

export const routes: Routes = [
    {path: "", title:"Project One", component: ProjectviewComponent },
    {path: "about", title: "About", component: AboutComponent},
    {path: "subsetsum", title: "Subset Sum Algorithm", component: SubsetsumComponent}
];
