import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ValuesCAGR } from '../../utils/models/forecast';

@Component({
  selector: 'app-cagr-calculation-modal',
  templateUrl: './cagr-calculation-modal.component.html',
  styleUrl: './cagr-calculation-modal.component.css'
})
export class CagrCalculationModalComponent {

  title: string = `Calculate CAGR (Compound Annual Growth Rate)`

  calculatedCAGR: number = 0;

  constructor(private dialogRef: MatDialogRef<CagrCalculationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { values: ValuesCAGR }) {
      this.title = `Calculate CAGR ${data?.values?.type == 1 ? 'Dividend' : data?.values?.type == 2 ? 'Share Price' : ''} (Compound Annual Growth Rate)`
  }


  close(succeeded: boolean = false){
    this.dialogRef.close({succeeded, calculatedCAGR: this.calculatedCAGR})
  }
}
