import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableCalculationsComponent } from './table-calculations/table-calculations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CagrCalculationModalComponent } from './cagr-calculation-modal/cagr-calculation-modal.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    TableCalculationsComponent,
    CagrCalculationModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    TableCalculationsComponent,
    CagrCalculationModalComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
