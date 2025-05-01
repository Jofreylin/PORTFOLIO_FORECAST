import { Component } from '@angular/core';
import { CalculationService } from '../../services/calculation.service';
import { ForecastPost } from '../../utils/models/forecast';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ForecastType, FrequencyType, HoldingPeriodType } from '../../utils/models/enums';

@Component({
  selector: 'app-table-calculations',
  templateUrl: './table-calculations.component.html',
  styleUrl: './table-calculations.component.css'
})
export class TableCalculationsComponent {
  
  stepperOrientation!: Observable<StepperOrientation>;
  
  forecastData: any[] = [];
  filteredData: any[] = [];
  forecastType: ForecastType = ForecastType.DividendStock; // Default to dividend/stock forecast
  holdingPeriodType: HoldingPeriodType = HoldingPeriodType.Years; 
  originalHoldingTime: number = 0; 

  ForecastType = ForecastType;
  HoldingPeriodType = HoldingPeriodType;

  showingColumns = {
    annualDividenPerShare: false,
    distributionFrequency: false,
    frequencyIncomeDividend: false,
    newSharesPerPeriod: false,
    periodContribution: true,      
    contributionFrequency: true,    
    annualContribution: false,      
    monthlyContribution: false,    
    monthlyNewShares: false,
    newSharesFromContributions: true,
    yearEndNewBalanceBeforeTaxes: true,
    yearEndNewBalance: true,
    afterDrip: true
  };

  // Common investment columns
  commonInvestmentColumns = {
    investmentBalance: true,
    contributionFrequency: true,
    periodicContribution: true,
    yearlyContributions: true,
    interestRate: true,
    yearEndNewBalanceBeforeTaxes: true,
    yearEndNewBalance: true,
    yearEndInvested: true,
    yearEndReturn: true
  };

  distributionFrequencies: {text:string, value:FrequencyType}[] = [
    {
      text: $localize`Annually`,
      value: FrequencyType.Annually
    },
    {
      text: $localize`Monthly`,
      value: FrequencyType.Monthly
    },
    {
      text: $localize`Quarterly`,
      value: FrequencyType.Quarterly
    }
  ]

  valueAddedToPortfolio: number = 0;
  distributionFrequencyDescription: string = '';
  contributionFrequencyDescription: string = '';
  forecastLastRow: any;

  chartInvestmentData: number[] = [];
  chartContributionsData: number[] = [];
  chartLabels: string[] = [];

  // Computed property for time period label
  get timePeriodLabel(): string {
    return this.holdingPeriodType === HoldingPeriodType.Years ? $localize`year(s)` : $localize`month(s)`;
  }

  formatPeriodValue(period: number): number {
    if (this.holdingPeriodType === HoldingPeriodType.Months) {
      if (period === this.forecastLastRow?.year) {
        return this.originalHoldingTime;
      }
      return Math.round(period * 12);
    }
    return Number.isInteger(period) ? period : Number(period.toFixed(2));
  }

  constructor(private investmentService: CalculationService,
    breakpointObserver: BreakpointObserver,
  ) { 
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  }

  // Helper method to ensure enum values are numbers
  private ensureNumericEnumValues(data: ForecastPost): ForecastPost {
    return {
      ...data,
      forecastType: Number(data.forecastType) as ForecastType,
      holdingPeriodType: Number(data.holdingPeriodType) as HoldingPeriodType,
      dividendDistributionFrequency: Number(data.dividendDistributionFrequency) as FrequencyType,
      contributionFrequency: Number(data.contributionFrequency || FrequencyType.Monthly) as FrequencyType
    };
  }

  generateForecast(data: ForecastPost){
    const processedData = this.ensureNumericEnumValues(data);
    
    this.originalHoldingTime = processedData.holdingTime;
    
    this.forecastType = processedData.forecastType;
    this.holdingPeriodType = processedData.holdingPeriodType;
    const forecastData = this.investmentService.calculateForecast(processedData);

    this.forecastData = forecastData.map(value => {
      if (this.forecastType === ForecastType.DividendStock) {
       
        const freqValue = Number(value.dividendDistributionFrequency) as FrequencyType;
        const contribValue = Number(value.contributionFrequencyValue) as FrequencyType;
        
        return {
          ...value,
          distributionFrequencyDescription: this.distributionFrequencies.find(x => x.value === freqValue)?.text,
          contributionFrequencyDescription: this.distributionFrequencies.find(x => x.value === contribValue)?.text
        };
      } else {
       
        const contribValue = Number(value.contributionFrequency) as FrequencyType;
        
        return {
          ...value,
          contributionFrequencyDescription: this.distributionFrequencies.find(x => x.value === contribValue)?.text
        };
      }
    });

    this.filteredData = this.forecastData.filter((item,index)=>{
      const year = index + 1;
      return year === 1 || year % 5 === 0 || year === this.forecastData.length;
    })

    this.chartInvestmentData = forecastData.map(value=>Number(value.yearEndNewBalance.toFixed(2)));
    this.chartContributionsData = forecastData.map(value=>value.yearEndInvested);
    
    const periodLabel = this.holdingPeriodType === HoldingPeriodType.Years ? $localize`Year` : $localize`Month`;
    
    this.chartLabels = forecastData.map((value, index) => {
      const periodValue = this.holdingPeriodType === HoldingPeriodType.Years 
        ? value.year 
        : (index + 1 === forecastData.length ? this.originalHoldingTime : Math.round(value.year * 12));
      return `${periodLabel} ${periodValue}`;
    });

    const lastIndex = this.filteredData.length - 1;

    if(lastIndex < 0){
      return;
    }
    
    this.forecastLastRow = this.filteredData[lastIndex];
    this.valueAddedToPortfolio = this.filteredData[lastIndex]?.yearEndNewBalance - this.filteredData[lastIndex]?.yearEndInvested;
    
    if (this.forecastType === ForecastType.DividendStock) {
      this.distributionFrequencyDescription = this.filteredData[lastIndex]?.distributionFrequencyDescription;
      this.contributionFrequencyDescription = this.filteredData[lastIndex]?.contributionFrequencyDescription;
    } else {
      this.contributionFrequencyDescription = this.filteredData[lastIndex]?.contributionFrequencyDescription;
    }
  }
}
