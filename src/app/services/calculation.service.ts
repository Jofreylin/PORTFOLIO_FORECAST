import { Injectable } from '@angular/core';
import { ForecastPost } from '../utils/models/forecast';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private  averageSharePrice!: number;
  private  investmentAmount!: number;
  private  annualContribution!: number;
  private  expectedDividendYield!: number;
  private  annualTaxRate!: number;
  private  dividendCAGR!: number;
  private  sharePriceCAGR!: number;
  private  dividendCompoundFrequency!: number;
  private  drip!: boolean;

  // Funciones para calcular métricas año por año
  calculateYearMetrics(year: number, previousData: any): any {
    const sharesOwned = (year == 1 ? previousData.sharesOwned : previousData.yearEndSharesOwned);
    const dividendYield = previousData.dividendYield * (year == 1 ? 1 : (1 + this.dividendCAGR));
    const annualDividendPerShare = (year == 1 ? this.averageSharePrice * dividendYield : previousData.yearEndStockPrice * (this.expectedDividendYield + (this.dividendCAGR * this.expectedDividendYield)));
    const annualDividendIncome = sharesOwned * annualDividendPerShare;
    const dividendCompoundFrequency = this.dividendCompoundFrequency;
    const monthlyContribution = this.annualContribution / 12;
    const frequencyIncomeDividend = annualDividendIncome / dividendCompoundFrequency;
    const newSharesPerPeriod = frequencyIncomeDividend / (year == 1 ? this.averageSharePrice : previousData.yearEndStockPrice);
    const monthlyNewShares = monthlyContribution / (year == 1 ? this.averageSharePrice : previousData.yearEndStockPrice);
    const newSharesFromContributions = 12 * monthlyNewShares;
    const afterDRIP = this.drip ? annualDividendIncome + (year == 1 ? this.investmentAmount : previousData.yearEndNewBalance) : 0;
    const yearEndSharesOwned = sharesOwned + (this.drip ? newSharesPerPeriod * dividendCompoundFrequency : 0) + newSharesFromContributions;
    const yearEndStockPrice = (year == 1 ? this.averageSharePrice : previousData.yearEndStockPrice) * (1 + this.sharePriceCAGR);
    const yearEndNewBalance = (yearEndSharesOwned * yearEndStockPrice) * (this.annualTaxRate > 0 ? (1 - this.annualTaxRate) : 1);
    const yearEndInvested = previousData.yearEndInvested + this.annualContribution;
    const yearEndReturn = yearEndNewBalance - yearEndInvested;

    return {
      year,
      sharesOwned,
      dividendYield,
      annualDividendPerShare,
      annualDividendIncome,
      dividendCompoundFrequency,
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
    this.dividendCompoundFrequency = +config.dividendCompoundFrequency;
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
