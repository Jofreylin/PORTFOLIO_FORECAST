import { Injectable } from '@angular/core';
import { ForecastPost } from '../utils/models/forecast';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private averageSharePrice!: number;
  private investmentAmount!: number;
  private annualContribution!: number;
  private expectedDividendYield!: number;
  private annualTaxRate!: number;
  private dividendCAGR!: number;
  private sharePriceCAGR!: number;
  private dividendDistributionFrequency!: number;
  private drip!: boolean;

  // Funciones para calcular métricas año por año
  calculateYearMetrics(year: number, previousData: any): any {

    const isInitialYear = year === 1;
    const previousSharesOwned = isInitialYear ? previousData.sharesOwned * (1 + this.sharePriceCAGR) : previousData.yearEndSharesOwned;

    const dividendYield = previousData.dividendYield * (isInitialYear ? 1 : (1 + this.dividendCAGR));
    const annualDividendPerShare = (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice) * dividendYield;
    const annualDividendIncome = previousSharesOwned * annualDividendPerShare;

    const frequencyIncomeDividend = annualDividendIncome / this.dividendDistributionFrequency;
    const newSharesPerPeriod = frequencyIncomeDividend / (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice);

    const afterDRIP = (this.drip && dividendYield > 0) ? (annualDividendIncome + (isInitialYear ? 0 : previousData.afterDRIP)) : 0;

    const monthlyContribution = this.annualContribution / 12;
    const monthlyNewShares = monthlyContribution / (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice);
    const newSharesFromContributions = 12 * monthlyNewShares;

    const yearEndSharesOwned = previousSharesOwned + (this.drip ? (newSharesPerPeriod * this.dividendDistributionFrequency) : 0) + newSharesFromContributions;

    const yearEndNewBalance = yearEndSharesOwned * (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice) * (this.annualTaxRate > 0 ? (1 - this.annualTaxRate) : 1);

    const yearEndStockPrice = (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice) * (1 + this.sharePriceCAGR);

    const yearEndInvested = previousData.yearEndInvested + this.annualContribution;
    const yearEndReturn = yearEndNewBalance - yearEndInvested;


    return {
      year,
      sharesOwned: previousSharesOwned,
      dividendYield,
      annualDividendPerShare,
      annualDividendIncome,
      dividendDistributionFrequency: this.dividendDistributionFrequency,
      frequencyIncomeDividend,
      newSharesPerPeriod,
      monthlyContribution,
      monthlyNewShares,
      newSharesFromContributions,
      afterDRIP,
      yearEndSharesOwned,
      yearEndStockPrice,
      yearEndNewBalance,
      yearEndInvested,
      yearEndReturn
    };
  }

  calculateForecast(config: ForecastPost): any[] {

    const years: number[] = [];

    if (config?.years <= 0) {
      return [];
    }

    for (let i = 1; i <= config.years; i++) {
      years.push(i)
    }

    this.averageSharePrice = config.averageSharePrice;
    this.investmentAmount = config.investmentAmount;
    this.annualContribution = config.monthlyContribution * 12;
    this.expectedDividendYield = config.expectedDividendYield / 100;
    this.annualTaxRate = config.annualTaxRate / 100;
    this.dividendCAGR = config.dividendCAGR / 100;
    this.sharePriceCAGR = config.sharePriceCAGR / 100;
    this.dividendDistributionFrequency = +config.dividendDistributionFrequency;
    this.drip = config.drip;

    let data = {
      sharesOwned: this.investmentAmount / this.averageSharePrice,
      dividendYield: this.expectedDividendYield,
      newShares: 0,
      yearEndInvested: this.investmentAmount
    };

    const forecast = years.map(year => {
      data = this.calculateYearMetrics(year, data);
      return data;
    });

    return forecast;
  }
}
