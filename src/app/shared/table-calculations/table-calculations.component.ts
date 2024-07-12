import { Component } from '@angular/core';
import { CalculationService } from '../../services/calculation.service';

@Component({
  selector: 'app-table-calculations',
  templateUrl: './table-calculations.component.html',
  styleUrl: './table-calculations.component.css'
})
export class TableCalculationsComponent {

  years: number[] = [];
  forecastData: any[] = [];

  showingColumns = {
    annualDividenPerShare: false,
    compoundFrequency: false,
    frequencyIncomeDividend: false,
    newSharesPerQuarter: false,
    monthlyContribution: false,
    monthlyNewShares: false,
    newSharesFromContributions: true,
    afterDrip: true
  };

  constructor(private investmentService: CalculationService) { }

  ngOnInit(): void {


    for(let i = 1; i <= 45; i++){
      this.years.push(i)
    }

    this.forecastData = this.investmentService.calculateForecast(this.years);
  }

}
