import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableCalculationsComponent } from '../../shared/table-calculations/table-calculations.component';
import { ForecastPost, ValuesCAGR } from '../../utils/models/forecast';
import { MatDialog } from '@angular/material/dialog';
import { CagrCalculationModalComponent } from '../../shared/cagr-calculation-modal/cagr-calculation-modal.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements AfterViewInit {

  valuesForm!: FormGroup;

  @ViewChild('calculationComponent') calculationComponent!: TableCalculationsComponent;

  distributionFrequencies: { text: string, value: number }[] = [
    {
      text: $localize`Annually`,
      value: 1
    },
    {
      text: $localize`Monthly`,
      value: 12
    },
    {
      text: $localize`Quarterly`,
      value: 4
    }
  ];

  lastCARG!: ValuesCAGR;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private titleService: Title, private metaService: Meta
  ) {

    this.metaService.addTags([
      { name: 'description', content: $localize`Use our Dividend and Stock Returns Forecaster to see how your investments can grow over time using compound interest. Calculate potential returns with various inputs for average share price, initial investment amount, monthly contribution, holding years, and more.` },
      { name: 'author', content: $localize`Jofreylin Perez Valdez` }
    ])

    this.valuesForm = this.fb.group({
      averageSharePrice: [null],
      investmentAmount: [null],
      monthlyContribution: [null],
      years: [null, Validators.required],
      expectedDividendYield: [null],
      annualTaxRate: [null],
      dividendCAGR: [null],
      sharePriceCAGR: [null],
      dividendDistributionFrequency: [null],
      drip: [true]
    });

  }

  ngAfterViewInit(): void {

    const lastForm = this.verifyLastFormSaved();

    if (!lastForm) {
      return;
    }

    this.valuesForm.patchValue(lastForm);
  }

  generateForecast() {

    if (this.valuesForm.invalid) {
      this.valuesForm.markAllAsTouched();
      return;
    }

    const values: ForecastPost = this.valuesForm.getRawValue();

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

  private verifyLastFormSaved(): ForecastPost | null {
    let formSaved: string | null = '';

    if (typeof localStorage !== 'undefined') {
      formSaved = localStorage?.getItem('lastForm');
    } else if (typeof sessionStorage !== 'undefined') {
      formSaved = sessionStorage?.getItem('lastForm');
    } else {
      console.log($localize`Web Storage is not supported in this environment.`);
    }

    if (!formSaved || formSaved == 'null' || formSaved == 'undefined') {
      return null;
    }

    const lastForm = JSON.parse(formSaved);

    return lastForm;
  }

  private saveForm(values: ForecastPost) {
    const lastFormToSave = JSON.stringify(values);

    if (typeof localStorage !== 'undefined') {
      localStorage?.setItem('lastForm', lastFormToSave);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage?.setItem('lastForm', lastFormToSave);
    } else {
      console.log($localize`Web Storage is not supported in this environment.`);
    }
  }
}
