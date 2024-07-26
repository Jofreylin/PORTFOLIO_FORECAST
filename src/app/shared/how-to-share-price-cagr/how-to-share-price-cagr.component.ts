import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to-share-price-cagr',
  templateUrl: './how-to-share-price-cagr.component.html',
  styleUrl: './how-to-share-price-cagr.component.css'
})
export class HowToSharePriceCagrComponent {

  cagrFormula = 'CAGR = \\left( \\frac{V_f}{V_i} \\right)^{\\frac{1}{n}} - 1';
  exampleCalculation1 = 'CAGR = \\left( \\frac{180}{100} \\right)^{\\frac{1}{5}} - 1';
  exampleCalculation2 = 'CAGR = (1.8)^{0.2} - 1';
  exampleCalculation3 = 'CAGR \\approx 1.1247 - 1 \\approx 0.1247 ';
  exampleCalculation4 = 'CAGR \\approx 0.1247 * 100 \\approx 12.47\\%';
}
