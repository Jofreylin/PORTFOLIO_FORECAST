import { ForecastType, FrequencyType, HoldingPeriodType } from './enums';

export interface ForecastPost {
  forecastType: ForecastType, 
  averageSharePrice: number,
  investmentAmount: number,
  periodContribution: number, 
  holdingTime: number, 
  holdingPeriodType: HoldingPeriodType, 
  expectedDividendYield: number,
  annualTaxRate: number,
  dividendCAGR: number,
  sharePriceCAGR: number,
  dividendDistributionFrequency: FrequencyType,
  drip: boolean,
  interestRate?: number,
  contributionFrequency?: FrequencyType 
}

export interface ValuesCAGR {
  initialValue: number, finalValue: number, initialYear: number, finalYear: number, calculatedCAGR:number, calculatedCAGRPercentage: number, type:number
}

