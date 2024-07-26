import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CagrCalculationModalComponent } from '../../../shared/cagr-calculation-modal/cagr-calculation-modal.component';

@Component({
  selector: 'app-dividend-cagr-page',
  templateUrl: './dividend-cagr-page.component.html',
  styleUrl: './dividend-cagr-page.component.css'
})
export class DividendCagrPageComponent {

  constructor(private dialog: MatDialog){

  }

  openCalculationCAGR(type:number){
    const values = {
      type: type
    }
    this.dialog.open(CagrCalculationModalComponent,{
      data:{
        values,
        showExplanation: false
      },
      disableClose: true,
      maxWidth: '80vw'
    });
  }

}
