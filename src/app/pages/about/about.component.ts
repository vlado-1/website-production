import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  onClick(target: EventTarget | null): void {
    var collElement: HTMLElement | null = <HTMLElement>target;
    var content: HTMLElement = <HTMLElement>collElement.nextElementSibling;

    if (target == null) {
      return;
    }

    collElement.classList.toggle("active");

    if (content.style.maxHeight){
      content.style.maxHeight = "";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
