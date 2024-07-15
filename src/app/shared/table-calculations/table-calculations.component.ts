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
    newSharesPerPeriod: false,
    monthlyContribution: false,
    monthlyNewShares: false,
    newSharesFromContributions: true,
    afterDrip: true
  };

  compoundFrequencies: {text:string, value:number}[] = [
    {
      text: 'Annually',
      value: 1
    },
    {
      text: 'Monthly',
      value: 12
    },
    {
      text: 'Quarterly',
      value: 4
    }
  ]

  constructor(private investmentService: CalculationService) { }

  ngOnInit(): void {


    
  }

  

  generateForecast(data:ForecastPost){
    const forecastData = this.investmentService.calculateForecast(data);

    this.forecastData = forecastData.map(value=>{
      return {
        ...value,
        compoundFrequencyDescription: this.compoundFrequencies.find(x=>x.value == value.dividendCompoundFrequency)?.text
      }
    })
  }

}
