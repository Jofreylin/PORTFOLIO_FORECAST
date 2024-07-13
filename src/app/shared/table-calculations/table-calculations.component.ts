import { Component } from '@angular/core';
import { CalculationService } from '../../services/calculation.service';
import { ForecastPost } from '../../utils/models/forecast';

@Component({
  selector: 'app-table-calculations',
  templateUrl: './table-calculations.component.html',
  styleUrl: './table-calculations.component.css'
})
export class TableCalculationsComponent {
  
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


    
  }

  generateForecast(data:ForecastPost){
    this.forecastData = this.investmentService.calculateForecast(data);
  }

}
