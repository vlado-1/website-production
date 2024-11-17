import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { SplitscreenComponent } from './components/splitscreen/splitscreen.component';

export const routes: Routes = [
    {path: "", title:"Project One", component: SplitscreenComponent, pathMatch: "full"},
    {path: "about", title: "About", component: AboutComponent}
];
