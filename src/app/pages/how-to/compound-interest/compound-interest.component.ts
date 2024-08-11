import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-compound-interest',
  templateUrl: './compound-interest.component.html',
  styleUrl: './compound-interest.component.css'
})
export class CompoundInterestComponent {

  formula = 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}';
  
  exampleCalculation1 = 'A = 1000 \\left(1 + \\frac{0.05}{1}\\right)^{1 * 10} = 1000 \\left(1.05\\right)^{10} \\approx 1628.89';
  exampleCalculation2 = 'A = 1000 \\left(1 + \\frac{0.05}{4}\\right)^{4 * 10} = 1000 \\left(1.0125\\right)^{40} \\approx 1643.62';

  constructor( private titleService: Title, private metaService: Meta
  ) {

    this.metaService.addTags([
      { name: 'description', content: $localize`Understanding compound interest and how to use it.` },
    ]);

  }
}
