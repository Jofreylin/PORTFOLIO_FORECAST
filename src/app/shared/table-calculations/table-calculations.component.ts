import { Component } from '@angular/core';
import { CalculationService } from '../../services/calculation.service';
import { ForecastPost } from '../../utils/models/forecast';
import {StepperOrientation} from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-table-calculations',
  templateUrl: './table-calculations.component.html',
  styleUrl: './table-calculations.component.css'
})
export class TableCalculationsComponent {
  
  stepperOrientation!: Observable<StepperOrientation>;
  
  forecastData: any[] = [];
  filteredData: any[] = [];

  showingColumns = {
    annualDividenPerShare: false,
    distributionFrequency: false,
    frequencyIncomeDividend: false,
    newSharesPerPeriod: false,
    monthlyContribution: false,
    monthlyNewShares: false,
    newSharesFromContributions: true,
    yearEndNewBalanceBeforeTaxes: true,
    yearEndNewBalance: true,
    afterDrip: true
  };

  distributionFrequencies: {text:string, value:number}[] = [
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

  valueAddedToPortfolio: number = 0;
  distributionFrequencyDescription: string = '';

  chartInvestmentData: number[] = [];
  chartContributionsData: number[] = [];
  chartLabels: string[] = [];

  constructor(private investmentService: CalculationService,
    breakpointObserver: BreakpointObserver,
  ) { 
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {


    
  }

  

  generateForecast(data:ForecastPost){
    const forecastData = this.investmentService.calculateForecast(data);

    this.forecastData = forecastData.map(value=>{
      return {
        ...value,
        distributionFrequencyDescription: this.distributionFrequencies.find(x=>x.value == value.dividendDistributionFrequency)?.text
      }
    })

    this.filteredData = this.forecastData.filter((item,index)=>{
      const year = index + 1;
      return year === 1 || year % 5 === 0 || year === this.forecastData.length;
    })

    this.chartInvestmentData = forecastData.map(value=>Number(value.yearEndNewBalance.toFixed(2)));
    this.chartContributionsData = forecastData.map(value=>value.yearEndInvested);
    this.chartLabels = forecastData.map(value=>`Year ${value.year}`);

    const lastIndex = this.filteredData.length - 1;

    if(lastIndex < 0){
      return;
    }

    this.valueAddedToPortfolio = this.filteredData[lastIndex]?.yearEndNewBalance - this.filteredData[lastIndex]?.yearEndInvested;
    this.distributionFrequencyDescription = this.filteredData[lastIndex]?.distributionFrequencyDescription;
  }

}
