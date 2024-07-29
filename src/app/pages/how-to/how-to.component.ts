import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent {

  routes: { title: string, description: string, route: string }[] = [
    {
      title: $localize`Forecaster`,
      description: $localize`How to use our forecaster to estimate your investments growth`,
      route: '/how-to/forecaster-exp'
    },
    {
      title: $localize`Compound Interest`,
      description: $localize`What is compound interest and how it works`,
      route: '/how-to/compound-interest'
    },
    {
      title: $localize`Dividend CAGR`,
      description: $localize`How to calculate Dividend Compound Annual Growth Rate`,
      route: '/how-to/dividend-cagr'
    },
    {
      title: $localize`Share Price CAGR`,
      description: $localize`How to calculate Share Price Compound Annual Growth Rate`,
      route: '/how-to/share-cagr'
    }
  ];

}
