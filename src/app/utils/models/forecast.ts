export interface ForecastPost {
  averageSharePrice: number,
  investmentAmount: number,
  monthlyContribution: number,
  years: number,
  expectedDividendYield: number,
  annualTaxRate: number,
  dividendCAGR: number,
  sharePriceCAGR: number,
  dividendCompoundFrequency: number,
  drip: boolean
}

export interface ValuesCAGR {
  firstYear: number, firstValue: number, lastYear: number, lastValue: number, type:number
}