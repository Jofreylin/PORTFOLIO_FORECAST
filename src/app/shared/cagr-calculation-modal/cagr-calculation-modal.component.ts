import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ValuesCAGR } from '../../utils/models/forecast';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cagr-calculation-modal',
  templateUrl: './cagr-calculation-modal.component.html',
  styleUrl: './cagr-calculation-modal.component.css'
})
export class CagrCalculationModalComponent {

  title: string = `Calculate CAGR (Compound Annual Growth Rate)`

  calculationForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<CagrCalculationModalComponent>,
    private fb:  FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { values: ValuesCAGR }) {
      this.title = `Calculate ${data?.values?.type == 1 ? 'Dividend' : data?.values?.type == 2 ? 'Share Price' : ''} CAGR (Compound Annual Growth Rate)`;

      this.calculationForm = this.fb.group({
        initialValue: [],
        finalValue: [],
        initialYear: [],
        finalYear: [],
        numberOfYears: [{value:'', disabled: true}],
        calculatedCAGR: [{value:'', disabled: true}],
        calculatedCAGRPercentage: [{value:'', disabled: true}],
        type: []
      })

      this.calculationForm.patchValue(data?.values);
  
  }

  calculate(){
    const values: ValuesCAGR = this.calculationForm.getRawValue();

    const numberOfYears: number = values?.finalYear - values?.initialYear;
    const dividedValues: number = values?.finalValue/values?.initialValue;

    this.calculationForm.get('numberOfYears')?.setValue(numberOfYears);

    if(numberOfYears <= 0){
      this.calculationForm.get('calculatedCAGR')?.setValue('');
      this.calculationForm.get('calculatedCAGRPercentage')?.setValue('');
      return;
    }

    const calculatedCAGR:number = (Math.pow( (dividedValues), (1/numberOfYears)) - 1);

    const calculatedCAGRPercentage:number = (calculatedCAGR*100);

    this.calculationForm.get('calculatedCAGR')?.setValue(calculatedCAGR.toFixed(4));
    this.calculationForm.get('calculatedCAGRPercentage')?.setValue(calculatedCAGRPercentage.toFixed(2));
  }

  close(succeeded: boolean = false){

    if(this.calculationForm.get('calculatedCAGR')?.value < 0){
      return;
    }

    this.dialogRef.close({succeeded, calculation: this.calculationForm.getRawValue()})
  }
}
