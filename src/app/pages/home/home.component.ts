import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableCalculationsComponent } from '../../shared/table-calculations/table-calculations.component';
import { ForecastPost } from '../../utils/models/forecast';
import { MatDialog } from '@angular/material/dialog';
import { CagrCalculationModalComponent } from '../../shared/cagr-calculation-modal/cagr-calculation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  valuesForm!: FormGroup;

  @ViewChild('calculationComponent') calculationComponent!: TableCalculationsComponent;

  compoundFrequencies: {text:string, value:number}[] = [
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

  constructor(private fb: FormBuilder,
    private dialog: MatDialog
  ) { 

    this.valuesForm = this.fb.group({
      averageSharePrice:[null],
      investmentAmount:[null],
      monthlyContribution:[null],
      years: [null],
      expectedDividendYield:[null],
      annualTaxRate:[null],
      dividendCAGR:[null],
      sharePriceCAGR:[null],
      dividendCompoundFrequency:[null],
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
    const values: ForecastPost = this.valuesForm.getRawValue();

    this.saveForm(values);
    
    this.calculationComponent.generateForecast(values);

  }

  openCalculationCAGR(type:number){
    this.dialog.open(CagrCalculationModalComponent,{
      data:{
      },
      disableClose: true,
      width: '80%'
    }).afterClosed().subscribe({
      next:(res)=>{
        if(!res?.succeeded){
          return;
        }


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
