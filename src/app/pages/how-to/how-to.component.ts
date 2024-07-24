import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrl: './how-to.component.css'
})
export class HowToComponent {

  routes: {title:string, description: string, route:string}[] = [
    {
      title: 'Dividend CAGR',
      description: 'How to calculate Dividend Compound Annual Growth Rate',
      route: '/how-to/dividend-cagr'
    },
    {
      title: 'Share Price CAGR',
      description: 'How to calculate Share Price Compound Annual Growth Rate',
      route: '/how-to/share-cagr'
    }
  ];

}
