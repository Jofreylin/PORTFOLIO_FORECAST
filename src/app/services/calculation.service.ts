import { Injectable } from '@angular/core';
import { ForecastPost } from '../utils/models/forecast';
import { ForecastType, FrequencyType, HoldingPeriodType } from '../utils/models/enums';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private forecastType!: ForecastType;
  private averageSharePrice!: number;
  private investmentAmount!: number;
  private periodContribution!: number;
  private contributionFrequencyValue!: FrequencyType;
  private actualHoldingYears!: number;
  private expectedDividendYield!: number;
  private annualTaxRate!: number;
  private dividendCAGR!: number;
  private sharePriceCAGR!: number;
  private dividendDistributionFrequency!: FrequencyType;
  private drip!: boolean;
  private interestRate!: number;

  private ensureNumericEnumValues(data: ForecastPost): ForecastPost {
    return {
      ...data,
      forecastType: Number(data.forecastType) as ForecastType,
      holdingPeriodType: Number(data.holdingPeriodType) as HoldingPeriodType,
      dividendDistributionFrequency: Number(data.dividendDistributionFrequency) as FrequencyType,
      contributionFrequency: Number(data.contributionFrequency || FrequencyType.Monthly) as FrequencyType
    };
  }

  // Calculate metrics for dividend/stock forecast year by year
  calculateYearMetrics(year: number, previousData: any): any {
    const isInitialYear = year === 1;
    const previousSharesOwned = isInitialYear ? previousData.sharesOwned * (1 + this.sharePriceCAGR) : previousData.yearEndSharesOwned;

    const dividendYield = previousData.dividendYield * (isInitialYear ? 1 : (1 + this.dividendCAGR));
    const annualDividendPerShare = (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice) * dividendYield;
    const annualDividendIncome = previousSharesOwned * annualDividendPerShare;

    const frequencyIncomeDividend = annualDividendIncome / this.dividendDistributionFrequency;
    const newSharesPerPeriod = frequencyIncomeDividend / (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice);

    const afterDRIP = (this.drip && dividendYield > 0) ? (annualDividendIncome + (isInitialYear ? 0 : previousData.afterDRIP)) : 0;

    const annualContribution = this.periodContribution * this.contributionFrequencyValue;
    
    // Monthly contribution for share purchases
    const monthlyContribution = annualContribution / 12;
    const monthlyNewShares = monthlyContribution / (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice);
    const newSharesFromContributions = 12 * monthlyNewShares;

    const yearEndSharesOwned = previousSharesOwned + (this.drip ? (newSharesPerPeriod * this.dividendDistributionFrequency) : 0) + newSharesFromContributions;

    const yearEndNewBalanceBeforeTaxes = yearEndSharesOwned * (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice);

    const yearEndNewBalance = yearEndNewBalanceBeforeTaxes * (this.annualTaxRate > 0 ? (1 - this.annualTaxRate) : 1);

    const yearEndStockPrice = (isInitialYear ? this.averageSharePrice : previousData.yearEndStockPrice) * (1 + this.sharePriceCAGR);

    const yearEndInvested = previousData.yearEndInvested + annualContribution;
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
      periodContribution: this.periodContribution,
      contributionFrequencyValue: this.contributionFrequencyValue,
      annualContribution,
      monthlyContribution,
      monthlyNewShares,
      newSharesFromContributions,
      afterDRIP,
      yearEndSharesOwned,
      yearEndStockPrice,
      yearEndNewBalanceBeforeTaxes,
      yearEndNewBalance,
      yearEndInvested,
      yearEndReturn
    };
  }

  // Calculate metrics for common investment forecast year by year
  calculateCommonInvestmentMetrics(year: number, previousData: any): any {
    const isInitialYear = year === 1;
    
    const previousBalance = isInitialYear ? this.investmentAmount : previousData.yearEndNewBalance;
    
    const yearlyContributions = this.periodContribution * this.contributionFrequencyValue;
    
    const balanceGrowth = previousBalance * Math.pow(1 + this.interestRate, 1);
    
    let contributionsGrowth;
    
    if (this.interestRate !== 0) {
      contributionsGrowth = yearlyContributions * 
        (Math.pow(1 + this.interestRate, 1) - 1) / this.interestRate;
    } else {
      contributionsGrowth = yearlyContributions;
    }
    
    const yearEndNewBalanceBeforeTaxes = balanceGrowth + contributionsGrowth;
    
    const yearEndNewBalance = yearEndNewBalanceBeforeTaxes * (this.annualTaxRate > 0 ? (1 - this.annualTaxRate) : 1);
    
    const yearEndInvested = previousData.yearEndInvested + yearlyContributions;
    
    // Calculate return
    const yearEndReturn = yearEndNewBalance - yearEndInvested;
    
    return {
      year,
      investmentBalance: previousBalance,
      contributionFrequency: this.contributionFrequencyValue,
      periodicContribution: this.periodContribution,
      yearlyContributions,
      interestRate: this.interestRate,
      yearEndNewBalanceBeforeTaxes,
      yearEndNewBalance,
      yearEndInvested,
      yearEndReturn
    };
  }

  calculateForecast(config: ForecastPost): any[] {
    // Ensure enum values are numbers
    const processedConfig = this.ensureNumericEnumValues(config);
    
   
    this.actualHoldingYears = processedConfig.holdingPeriodType === HoldingPeriodType.Years 
      ? processedConfig.holdingTime 
      : processedConfig.holdingTime / 12;

    
    const wholePeriods = Math.floor(this.actualHoldingYears);
    const years: number[] = [];

    const minPeriods = Math.max(1, wholePeriods);
    
    for (let i = 1; i <= minPeriods; i++) {
      years.push(i);
    }

    this.forecastType = processedConfig.forecastType;
    this.investmentAmount = processedConfig.investmentAmount;
    this.periodContribution = processedConfig.periodContribution;
    this.annualTaxRate = processedConfig.annualTaxRate / 100;
    
    if (this.forecastType === ForecastType.DividendStock) {
      // Dividend and stock forecast
      this.averageSharePrice = processedConfig.averageSharePrice;
      this.expectedDividendYield = processedConfig.expectedDividendYield / 100;
      this.dividendCAGR = processedConfig.dividendCAGR / 100;
      this.sharePriceCAGR = processedConfig.sharePriceCAGR / 100;
      this.dividendDistributionFrequency = processedConfig.dividendDistributionFrequency;
      this.drip = processedConfig.drip;
      this.contributionFrequencyValue = processedConfig.contributionFrequency || FrequencyType.Monthly; // Default to monthly

      let data: any = {
        sharesOwned: this.investmentAmount / this.averageSharePrice,
        dividendYield: this.expectedDividendYield,
        newShares: 0,
        yearEndInvested: this.investmentAmount
      };

      const result = years.map(year => {
        data = this.calculateYearMetrics(year, data);
        return data;
      });

      
      if (this.actualHoldingYears > wholePeriods) {
        const partialPeriod = this.actualHoldingYears - wholePeriods;
        
       
        if (partialPeriod > 0 && result.length > 0) {
          const lastIndex = result.length - 1;
          const lastFullPeriodData = result[lastIndex];
          
      
          const partialPeriodData = { ...lastFullPeriodData };
          
       
          const partialYearContribution = lastFullPeriodData.annualContribution * partialPeriod;
          
     
          const partialYearSharePrice = lastFullPeriodData.yearEndStockPrice * 
            Math.pow(1 + this.sharePriceCAGR, partialPeriod);
          
          const partialYearDividendYield = lastFullPeriodData.dividendYield * 
            Math.pow(1 + this.dividendCAGR, partialPeriod);
          
     
          const partialYearDividendIncome = 
            lastFullPeriodData.yearEndSharesOwned * partialYearSharePrice * partialYearDividendYield * partialPeriod;
          
      
          const newSharesFromPartialContributions = 
            (partialYearContribution / partialYearSharePrice);
          

          const newSharesFromDividends = this.drip ? 
            (partialYearDividendIncome / partialYearSharePrice) : 0;
          
     
          const partialYearEndSharesOwned = 
            lastFullPeriodData.yearEndSharesOwned + newSharesFromPartialContributions + newSharesFromDividends;
          
   
          const partialYearEndBalance = 
            partialYearEndSharesOwned * partialYearSharePrice;
          
      
          const partialYearEndBalanceAfterTax = 
            partialYearEndBalance * (this.annualTaxRate > 0 ? (1 - this.annualTaxRate) : 1);
          
       
          const partialYearTotalInvested = 
            lastFullPeriodData.yearEndInvested + partialYearContribution;
          
        
          result.push({
            ...partialPeriodData,
            year: this.actualHoldingYears,
            yearEndSharesOwned: partialYearEndSharesOwned,
            yearEndStockPrice: partialYearSharePrice,
            yearEndNewBalanceBeforeTaxes: partialYearEndBalance,
            yearEndNewBalance: partialYearEndBalanceAfterTax,
            yearEndInvested: partialYearTotalInvested,
            yearEndReturn: partialYearEndBalanceAfterTax - partialYearTotalInvested
          });
        }
      }

      return result;
    } else {

      this.interestRate = processedConfig.interestRate! / 100;
      this.contributionFrequencyValue = processedConfig.contributionFrequency || FrequencyType.Monthly; // Default to monthly

     
      if (processedConfig.contributionFrequency === FrequencyType.Annually) {
        
        this.contributionFrequencyValue = FrequencyType.Annually;
      }

      let data: any = {
        yearEndInvested: this.investmentAmount
      };

      const result = years.map(year => {
        data = this.calculateCommonInvestmentMetrics(year, data);
        return data;
      });
      
      // Handle partial periods (e.g. if holding time is 2.5 years)
      if (this.actualHoldingYears > wholePeriods) {
        const partialPeriod = this.actualHoldingYears - wholePeriods;
        
     
        if (partialPeriod > 0 && result.length > 0) {
          const lastIndex = result.length - 1;
          const lastFullPeriodData = result[lastIndex];
          
       
          const periodsInPartialYear = Math.floor(partialPeriod * this.contributionFrequencyValue);
          
 
          const startingBalance = lastFullPeriodData.yearEndNewBalance;
          
          const partialPeriodContributions = this.periodContribution * periodsInPartialYear;
          
          const balanceGrowth = startingBalance * 
            Math.pow(1 + this.interestRate, partialPeriod);
          
          let contributionsGrowth;
          if (this.interestRate !== 0 && periodsInPartialYear > 0) {
            contributionsGrowth = partialPeriodContributions * 
              (Math.pow(1 + this.interestRate, partialPeriod) - 1) / this.interestRate;
          } else {
          
            contributionsGrowth = partialPeriodContributions;
          }
          
        
          const partialPeriodEndBalanceBeforeTax = balanceGrowth + contributionsGrowth;
          
         
          const partialPeriodEndBalance = 
            partialPeriodEndBalanceBeforeTax * (this.annualTaxRate > 0 ? (1 - this.annualTaxRate) : 1);
          
          
          const partialPeriodTotalInvested = 
            lastFullPeriodData.yearEndInvested + partialPeriodContributions;
          
          
          result.push({
            year: this.actualHoldingYears,
            investmentBalance: startingBalance,
            contributionFrequency: this.contributionFrequencyValue,
            periodicContribution: this.periodContribution,
            yearlyContributions: partialPeriodContributions,
            interestRate: this.interestRate,
            yearEndNewBalanceBeforeTaxes: partialPeriodEndBalanceBeforeTax,
            yearEndNewBalance: partialPeriodEndBalance,
            yearEndInvested: partialPeriodTotalInvested,
            yearEndReturn: partialPeriodEndBalance - partialPeriodTotalInvested
          });
        }
      }
      
      return result;
    }
  }
}
