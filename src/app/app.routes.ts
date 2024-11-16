import { Routes } from '@angular/router';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { SplitscreenComponent } from './components/splitscreen/splitscreen.component';

export const routes: Routes = [
    {path: "", title:"Project One", component: SplitscreenComponent, pathMatch: "full"},
    {path: "aboutme", title: "About Me", component: AboutmeComponent}
];
