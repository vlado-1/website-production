import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css'
})
export class ShowcaseComponent {

}
