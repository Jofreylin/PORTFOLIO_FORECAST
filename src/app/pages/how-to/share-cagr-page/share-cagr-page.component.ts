import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CagrCalculationModalComponent } from '../../../shared/cagr-calculation-modal/cagr-calculation-modal.component';

@Component({
  selector: 'app-share-cagr-page',
  templateUrl: './share-cagr-page.component.html',
  styleUrl: './share-cagr-page.component.css'
})
export class ShareCagrPageComponent {

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
