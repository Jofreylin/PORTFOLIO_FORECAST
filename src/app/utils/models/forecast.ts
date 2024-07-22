export interface ForecastPost {
  averageSharePrice: number,
  investmentAmount: number,
  monthlyContribution: number,
  years: number,
  expectedDividendYield: number,
  annualTaxRate: number,
  dividendCAGR: number,
  sharePriceCAGR: number,
  dividendDistributionFrequency: number,
  drip: boolean
}

export interface ValuesCAGR {
  initialValue: number, finalValue: number, initialYear: number, finalYear: number, calculatedCAGR:number, calculatedCAGRPercentage: number, type:number
}

