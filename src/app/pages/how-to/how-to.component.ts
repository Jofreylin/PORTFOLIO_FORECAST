import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrl: './how-to.component.css'
})
export class HowToComponent {

  routes: {title:string, description: string, route:string}[] = [
    {
      title: 'Forecaster',
      description: 'How to use our forecaster to estimate your invesments growth',
      route: '/how-to/forecaster-exp'
    },
    {
      title: 'Compound Interest',
      description: 'What is compound interest and how it works',
      route: '/how-to/compound-interest'
    },
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
