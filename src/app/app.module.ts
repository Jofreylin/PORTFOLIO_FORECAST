import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask'
import { NgxSpinnerModule } from "ngx-spinner";
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HowToComponent } from './pages/how-to/how-to.component';
import { DividendCagrPageComponent } from './pages/how-to/dividend-cagr-page/dividend-cagr-page.component';
import { ShareCagrPageComponent } from './pages/how-to/share-cagr-page/share-cagr-page.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { ForecasterExplanationComponent } from './pages/how-to/forecaster-explanation/forecaster-explanation.component';
import { CompoundInterestComponent } from './pages/how-to/compound-interest/compound-interest.component';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

// Registrar los datos de localización para en-US
registerLocaleData(localeEn, 'en-US');

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    HomeComponent,
    CalculatorComponent,
    HowToComponent,
    DividendCagrPageComponent,
    ShareCagrPageComponent,
    DisclaimerComponent,
    ForecasterExplanationComponent,
    CompoundInterestComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    NgxSpinnerModule,
    MatDialogModule,
    SharedModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
