import { Component } from '@angular/core';
import { SubsetsuminputComponent } from "../../components/subsetsuminput/subsetsuminput.component";
import { ChartComponent } from "../../components/chart/chart.component";

@Component({
  selector: 'app-subsetsum',
  standalone: true,
  imports: [SubsetsuminputComponent, ChartComponent],
  templateUrl: './subsetsum.component.html',
  styleUrl: './subsetsum.component.css'
})
export class SubsetsumComponent {

}
