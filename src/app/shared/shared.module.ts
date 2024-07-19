import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableCalculationsComponent } from './table-calculations/table-calculations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CagrCalculationModalComponent } from './cagr-calculation-modal/cagr-calculation-modal.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { KatexDirective } from './directives/katex.directive';
import { HowToDividendCagrComponent } from './how-to-dividend-cagr/how-to-dividend-cagr.component';
import { HowToSharePriceCagrComponent } from './how-to-share-price-cagr/how-to-share-price-cagr.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    TableCalculationsComponent,
    CagrCalculationModalComponent,
    KatexDirective,
    HowToDividendCagrComponent,
    HowToSharePriceCagrComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    TableCalculationsComponent,
    CagrCalculationModalComponent,
    KatexDirective
  ],
  providers: [
    provideNgxMask()
  ]
})
export class SharedModule { }
