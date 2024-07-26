import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to-dividend-cagr',
  templateUrl: './how-to-dividend-cagr.component.html',
  styleUrl: './how-to-dividend-cagr.component.css'
})
export class HowToDividendCagrComponent {

  cagrFormula = 'CAGR = \\left( \\frac{V_f}{V_i} \\right)^{\\frac{1}{n}} - 1';
  exampleCalculation1 = 'CAGR = \\left( \\frac{3}{2} \\right)^{\\frac{1}{5}} - 1';
  exampleCalculation2 = 'CAGR = (1.5)^{0.2} - 1';
  exampleCalculation3 = 'CAGR \\approx 1.0845 - 1 \\approx 0.0845 ';
  exampleCalculation4 = 'CAGR \\approx 0.0845 * 100 \\approx 8.45\\%';
}
