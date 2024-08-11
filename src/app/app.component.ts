import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(private titleService: Title, private metaService: Meta
  ) {

    this.metaService.addTags([
      { name: 'description', content: $localize`Use our Dividend and Stock Returns Forecaster to see how your investments can grow over time using compound interest. Calculate potential returns with various inputs for average share price, initial investment amount, monthly contribution, holding years, and more.` },
      { name: 'keywords', content: $localize`dividend, stock returns, forecaster, investment, compound interest, share price, initial investment, monthly contribution, CAGR, DRIP, investment forecaster, compound interest, financial growth, finance, yahoo finance, google finance, apple finance, Jofreylin Perez Valdez, By Jofrey, calculator, estimating tools, dominican republic, latam` },
      { name: 'author', content: $localize`Jofreylin Perez Valdez` }
    ]);

  }


  ngOnInit() {
    
  }

}
