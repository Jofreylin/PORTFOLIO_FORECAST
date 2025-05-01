import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableCalculationsComponent } from '../../shared/table-calculations/table-calculations.component';
import { ForecastPost, ValuesCAGR } from '../../utils/models/forecast';
import { MatDialog } from '@angular/material/dialog';
import { CagrCalculationModalComponent } from '../../shared/cagr-calculation-modal/cagr-calculation-modal.component';
import { Meta, Title } from '@angular/platform-browser';
import { ForecastType, FrequencyType, HoldingPeriodType } from '../../utils/models/enums';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements AfterViewInit {

  valuesForm!: FormGroup;
  forecastType: ForecastType = ForecastType.DividendStock; // Default to dividend/stock forecast
  
  private hasGeneratedForecast: boolean = false;
  
  ForecastType = ForecastType;
  FrequencyType = FrequencyType;
  HoldingPeriodType = HoldingPeriodType;

  @ViewChild('calculationComponent') calculationComponent!: TableCalculationsComponent;

  distributionFrequencies: { text: string, value: FrequencyType }[] = [
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
  ];

  contributionFrequencies = this.distributionFrequencies;
  
  holdingPeriodTypes: { text: string, value: HoldingPeriodType }[] = [
    {
      text: $localize`Years`,
      value: HoldingPeriodType.Years
    },
    {
      text: $localize`Months`,
      value: HoldingPeriodType.Months
    }
  ];

  lastCARG!: ValuesCAGR;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private titleService: Title, private metaService: Meta
  ) {

    this.metaService.addTags([
      { name: 'description', content: $localize`Use our Investment Forecaster to see how your investments can grow over time using compound interest. Calculate potential returns with various inputs for average share price, initial investment amount, contribution, holding time, and more.` },
      { name: 'author', content: $localize`Jofreylin Perez Valdez` }
    ])

    this.valuesForm = this.fb.group({
      forecastType: [this.forecastType, Validators.required],
      averageSharePrice: [null],
      investmentAmount: [null, Validators.required], 
      periodContribution: [null, [Validators.min(0)]], 
      holdingTime: [null, [Validators.required, Validators.min(1)]], 
      holdingPeriodType: [HoldingPeriodType.Years], 
      expectedDividendYield: [null],
      annualTaxRate: [null, [Validators.min(0), Validators.max(100)]], // 0-100%
      dividendCAGR: [null],
      sharePriceCAGR: [null],
      dividendDistributionFrequency: [null],
      drip: [true],
      interestRate: [null],
      contributionFrequency: [FrequencyType.Monthly] // Default to monthly
    });

 
    this.valuesForm.get('forecastType')?.valueChanges.subscribe(value => {
      this.forecastType = Number(value) as ForecastType;
      this.updateValidators();
      
      if (this.valuesForm.valid && this.hasGeneratedForecast) {
        this.generateForecast();
      }
    });
    
   
    this.updateValidators();
  }
  
 
  updateValidators() {
    if (this.forecastType === ForecastType.DividendStock) {
      // Dividend & Stock Growth specific validations
      this.valuesForm.get('averageSharePrice')?.setValidators([Validators.required, Validators.min(0.01)]);
      this.valuesForm.get('dividendDistributionFrequency')?.setValidators(Validators.required);
      
      // Make interest rate optional
      this.valuesForm.get('interestRate')?.clearValidators();
    } else {
      // Common Investment specific validations
      this.valuesForm.get('interestRate')?.setValidators([Validators.required, Validators.min(0)]);
      
   
      this.valuesForm.get('averageSharePrice')?.clearValidators();
      this.valuesForm.get('dividendDistributionFrequency')?.clearValidators();
    }
    
    // Update validators on contribution frequency
    this.valuesForm.get('contributionFrequency')?.setValidators(Validators.required);
    
    // Update form validation
    this.valuesForm.get('averageSharePrice')?.updateValueAndValidity();
    this.valuesForm.get('dividendDistributionFrequency')?.updateValueAndValidity();
    this.valuesForm.get('interestRate')?.updateValueAndValidity();
    this.valuesForm.get('contributionFrequency')?.updateValueAndValidity();
  }

  ngAfterViewInit(): void {
    const lastForm = this.verifyLastFormSaved();

    if (!lastForm) {
      return;
    }

    // Handle migrating old format to new format if needed
    if ((lastForm as any).years !== undefined && lastForm.holdingTime === undefined) {
      lastForm.holdingTime = (lastForm as any).years;
      lastForm.holdingPeriodType = HoldingPeriodType.Years; // years
    }

    if ((lastForm as any).monthlyContribution !== undefined && lastForm.periodContribution === undefined) {
      lastForm.periodContribution = (lastForm as any).monthlyContribution;
      
    
      if (lastForm.forecastType === ForecastType.DividendStock) {
        lastForm.contributionFrequency = FrequencyType.Monthly;
      }
    }

    // Ensure enum values are numbers, not strings
    this.ensureNumericEnumValues(lastForm);

    this.valuesForm.patchValue(lastForm);
    this.forecastType = Number(lastForm.forecastType) as ForecastType || ForecastType.DividendStock;
    
    this.updateValidators();
    
    
  }

  private ensureNumericEnumValues(data: any): void {
    if (data.forecastType !== undefined) {
      data.forecastType = Number(data.forecastType);
    }
    if (data.holdingPeriodType !== undefined) {
      data.holdingPeriodType = Number(data.holdingPeriodType);
    }
    if (data.dividendDistributionFrequency !== undefined) {
      data.dividendDistributionFrequency = Number(data.dividendDistributionFrequency);
    }
    if (data.contributionFrequency !== undefined) {
      data.contributionFrequency = Number(data.contributionFrequency);
    }
  }

  generateForecast() {
    if (this.valuesForm.invalid) {
      this.valuesForm.markAllAsTouched();
      const invalidControls: string[] = [];
      Object.keys(this.valuesForm.controls).forEach(key => {
        const control = this.valuesForm.get(key);
        if (control?.invalid) {
          invalidControls.push(key);
        }
      });
      
      console.log('Invalid fields:', invalidControls);
      return;
    }

    this.hasGeneratedForecast = true;

    const rawValues = this.valuesForm.getRawValue();
    
    const values: ForecastPost = {
      ...rawValues,
      forecastType: Number(rawValues.forecastType) as ForecastType,
      holdingPeriodType: Number(rawValues.holdingPeriodType) as HoldingPeriodType,
      dividendDistributionFrequency: Number(rawValues.dividendDistributionFrequency) as FrequencyType,
      contributionFrequency: Number(rawValues.contributionFrequency) as FrequencyType
    };
    
    if (values.periodContribution === null) {
      values.periodContribution = 0;
    }
    
    if (values.annualTaxRate === null) {
      values.annualTaxRate = 0;
    }
    
    if (values.forecastType === ForecastType.DividendStock) {
      // Set defaults for dividend & stock forecast
      if (values.dividendCAGR === null) {
        values.dividendCAGR = 0;
      }
      
      if (values.sharePriceCAGR === null) {
        values.sharePriceCAGR = 0;
      }
      
      if (values.expectedDividendYield === null) {
        values.expectedDividendYield = 0;
      }
    } else {
      if (values.interestRate === null) {
        values.interestRate = 0;
      }
    }

    this.saveForm(values);

    this.calculationComponent.generateForecast(values);
  }

  openCalculationCAGR(type: number) {
    const values = this.lastCARG?.type == type ? this.lastCARG : {
      type: type
    }

    this.dialog.open(CagrCalculationModalComponent, {
      data: {
        values,
        showExplanation: true
      },
      disableClose: true,
      maxWidth: '80vw'
    }).afterClosed().subscribe({
      next: (res: { succeeded: boolean, calculation: ValuesCAGR }) => {
        if (!res?.succeeded) {
          return;
        }

        this.lastCARG = res?.calculation;
        const parameter: string = res?.calculation.type == 1 ? 'dividendCAGR' : 'sharePriceCAGR';
        this.valuesForm.get(parameter)?.setValue(res?.calculation.calculatedCAGRPercentage);
      }
    })
  }

  verifyLastFormSaved(): ForecastPost | null {
    let lastForm = null;

    if (typeof localStorage !== 'undefined') {
      lastForm = localStorage?.getItem('lastForm');
    } else if (typeof sessionStorage !== 'undefined') {
      lastForm = sessionStorage?.getItem('lastForm');
    } else {
      console.log($localize`Web Storage is not supported in this environment.`);
    }

    if (!lastForm) {
      return null;
    }

    try {
      return JSON.parse(lastForm);
    } catch (error) {
      console.error('Error parsing last form', error);
      return null;
    }
  }

  private saveForm(values: ForecastPost) {
    const formToSave = {
      ...values,
      forecastType: Number(values.forecastType),
      holdingPeriodType: Number(values.holdingPeriodType),
      dividendDistributionFrequency: Number(values.dividendDistributionFrequency),
      contributionFrequency: Number(values.contributionFrequency)
    };
    
    const lastFormToSave = JSON.stringify(formToSave);

    if (typeof localStorage !== 'undefined') {
      localStorage?.setItem('lastForm', lastFormToSave);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage?.setItem('lastForm', lastFormToSave);
    } else {
      console.log($localize`Web Storage is not supported in this environment.`);
    }
  }
}
