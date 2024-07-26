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
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements AfterViewInit {

  valuesForm!: FormGroup;

  @ViewChild('calculationComponent') calculationComponent!: TableCalculationsComponent;

  distributionFrequencies: {text:string, value:number}[] = [
    {
      text: 'Annually',
      value: 1
    },
    {
      text: 'Monthly',
      value: 12
    },
    {
      text: 'Quarterly',
      value: 4
    }
  ]

  lastCARG!: ValuesCAGR;

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private titleService: Title, private metaService: Meta
  ) { 

    this.titleService.setTitle('Dividend and Stock Returns Forecaster - Grow Your Investments');
    
    this.metaService.addTags([
      { name: 'description', content: 'Use our Dividend and Stock Returns Forecaster to see how your investments can grow over time using compound interest. Calculate potential returns with various inputs for average share price, initial investment amount, monthly contribution, holding years, and more.' },
      { name: 'keywords', content: 'dividend, stock returns, forecaster, investment, compound interest, share price, initial investment, monthly contribution, CAGR, DRIP' },
      { name: 'author', content: 'Jofreylin Perez Valdez' },
      { property: 'og:title', content: 'Dividend and Stock Returns Forecaster - Grow Your Investments' },
      { property: 'og:description', content: 'See how your investments can grow over time using compound interest with our Dividend and Stock Returns Forecaster. Input your data to calculate potential returns.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://forecaster.byjofrey.com/calculator' },
      { property: 'og:image', content: 'https://forecaster.byjofrey.com/assets/images/principal.png' },
      { property: 'og:site_name', content: 'By Jofrey' },
      // { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:title', content: 'Dividend and Stock Returns Forecaster - Grow Your Investments' },
      // { name: 'twitter:description', content: 'Calculate your potential investment returns using our Dividend and Stock Returns Forecaster with compound interest.' },
      // { name: 'twitter:image', content: 'https://www.yourwebsite.com/path/to/forecaster-image.png' },
      // { name: 'twitter:site', content: '@yourtwitterhandle' }
    ]);

    this.valuesForm = this.fb.group({
      averageSharePrice:[null],
      investmentAmount:[null],
      monthlyContribution:[null],
      years: [null, Validators.required],
      expectedDividendYield:[null],
      annualTaxRate:[null],
      dividendCAGR:[null],
      sharePriceCAGR:[null],
      dividendDistributionFrequency:[null],
      drip:[true]
    })

  }

  ngAfterViewInit(): void {

    const lastForm = this.verifyLastFormSaved();

    if(!lastForm){
      return;
    }

    this.valuesForm.patchValue(lastForm);
  }

  generateForecast(){

    if(this.valuesForm.invalid){
      this.valuesForm.markAllAsTouched();
      return;
    }

    const values: ForecastPost = this.valuesForm.getRawValue();

    this.saveForm(values);
    
    this.calculationComponent.generateForecast(values);

  }

  openCalculationCAGR(type:number){

    const values = this.lastCARG?.type == type ? this.lastCARG : {
      type: type
    }

    this.dialog.open(CagrCalculationModalComponent,{
      data:{
        values,
        showExplanation: true
      },
      disableClose: true,
      maxWidth: '80vw'
    }).afterClosed().subscribe({
      next:(res: {succeeded: boolean, calculation: ValuesCAGR})=>{
        if(!res?.succeeded){
          return;
        }

        this.lastCARG = res?.calculation;
        const parameter: string = res?.calculation.type == 1 ? 'dividendCAGR' : 'sharePriceCAGR';
        this.valuesForm.get(parameter)?.setValue(res?.calculation.calculatedCAGRPercentage);
        
      }
    })
  }

  private verifyLastFormSaved(): ForecastPost | null{
    let formSaved: string | null = '';

    if (typeof localStorage !== 'undefined') {
      formSaved = localStorage?.getItem('lastForm');
    } else if (typeof sessionStorage !== 'undefined') {
      formSaved = sessionStorage?.getItem('lastForm');
    } else {
      console.log('Web Storage is not supported in this environment.');
    }

    if(!formSaved || formSaved == 'null' || formSaved == 'undefined'){
      return null;
    }

    const lastForm = JSON.parse(formSaved);

    return lastForm;
  }

  private saveForm(values: ForecastPost){
    const lastFormToSave = JSON.stringify(values);

    if (typeof localStorage !== 'undefined') {
      localStorage?.setItem('lastForm',lastFormToSave);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage?.setItem('lastForm',lastFormToSave);
    } else {
      console.log('Web Storage is not supported in this environment.');
    }
  }
}
