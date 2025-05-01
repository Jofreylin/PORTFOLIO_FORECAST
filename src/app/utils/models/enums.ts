
export enum ForecastType {
  DividendStock = 1,
  CommonInvestment = 2
}


export enum HoldingPeriodType {
  Years = 1,
  Months = 12
}


export enum FrequencyType {
  Annually = 1,
  Quarterly = 4,
  Monthly = 12,
  BiMonthly = 6,   // Every two months
  SemiAnnually = 2 // Twice a year
}


export enum CompoundFrequencyEnum {
  Annually = 1,
  SemiAnnually = 2,
  Quarterly = 4,
  Monthly = 12,
  BiWeekly = 26,
  Weekly = 52,
  Daily = 365,
  Continuous = 0 
}