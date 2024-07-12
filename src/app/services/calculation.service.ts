import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  averageSharePrice: number = 266.82;
  investmentAmount: number = 100;
  annualContribution: number = 1200;
  expectedDividendYield: number = 0.02138;
  dividendTaxRate: number = 0;
  dividendCAGR: number = 0.09476;
  sharePriceCAGR: number = 0.11525;
  drip: boolean = true;

  // Funciones para calcular métricas año por año
  calculateYearMetrics(year: number, previousData: any): any {
    const sharesOwned = (year == 1 ? previousData.sharesOwned: previousData.yearEndSharesOwned);
    const dividendYield = previousData.dividendYield * ( year == 1 ? 1 : (1 + this.dividendCAGR));
    const annualDividendPerShare = (year == 1 ? this.averageSharePrice * dividendYield : previousData.yearEndStockPrice * (this.expectedDividendYield+(this.dividendCAGR*this.expectedDividendYield))) ;
    const annualDividendIncome = sharesOwned * annualDividendPerShare;
    const compoundFrequencyQuarterly = 4;
    const frequencyIncomeDividend = annualDividendIncome / compoundFrequencyQuarterly;
    const newSharesPerQuarter = frequencyIncomeDividend / (year == 1 ? this.averageSharePrice: previousData.yearEndStockPrice);
    const monthlyContribution = this.annualContribution / 12;
    const monthlyNewShares = monthlyContribution / (year == 1 ? this.averageSharePrice: previousData.yearEndStockPrice);
    const newSharesFromContributions = 12 * monthlyNewShares;
    const afterDRIP = this.drip ? annualDividendIncome + (year == 1 ? this.investmentAmount: previousData.yearEndNewBalance) : 0;
    const yearEndSharesOwned = sharesOwned + (this.drip ? newSharesPerQuarter * compoundFrequencyQuarterly : 0 ) + newSharesFromContributions;
    const yearEndStockPrice = (year == 1 ? this.averageSharePrice: previousData.yearEndStockPrice) * (1 + this.sharePriceCAGR);
    const yearEndNewBalance = yearEndSharesOwned * yearEndStockPrice;
    const yearEndInvested =  previousData.yearEndInvested + this.annualContribution;
    const yearEndReturn = yearEndNewBalance - yearEndInvested;

    return {
      year,
      sharesOwned,
      dividendYield,
      annualDividendPerShare,
      annualDividendIncome,
      compoundFrequencyQuarterly,
      frequencyIncomeDividend,
      newSharesPerQuarter,
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

  calculateForecast(years: number[]): any[] {
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
