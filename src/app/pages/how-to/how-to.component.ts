import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrl: './how-to.component.css'
})
export class HowToComponent {

  routes: {title:string, description: string}[] = [
    {
      title: 'Dividend CAGR',
      description: 'Si eso mimo'
    },
    {
      title: 'Dividend CAGR',
      description: 'Si eso mimo'
    },
    {
      title: 'Dividend CAGR',
      description: 'Si eso mimo'
    }
  ];

}
