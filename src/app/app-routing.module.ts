import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { HowToComponent } from './pages/how-to/how-to.component';
import { DividendCagrPageComponent } from './pages/how-to/dividend-cagr-page/dividend-cagr-page.component';
import { ShareCagrPageComponent } from './pages/how-to/share-cagr-page/share-cagr-page.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { ForecasterExplanationComponent } from './pages/how-to/forecaster-explanation/forecaster-explanation.component';
import { CompoundInterestComponent } from './pages/how-to/compound-interest/compound-interest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    title: $localize`Investment Forecaster by Jofrey - Grow Your Investments with Compound Interest`
  },
  {
    path: '',
    component: CommonLayoutComponent,
    title: $localize`Investment Forecaster by Jofrey - Grow Your Investments with Compound Interest`,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
        title: $localize`Dividend and Stock Returns Forecaster - Grow Your Investments`,
      },
      {
        path: "disclaimer",
        component: DisclaimerComponent,
        title: $localize`Disclaimer`,
      },
      {
        path: 'how-to',
        title: $localize`How to - Financial explanations and formulas`,
        children: [
          {
            path: '',
            component: HowToComponent,
          },
          {
            path: 'dividend-cagr',
            component: DividendCagrPageComponent,
            title: $localize`How to calculate Dividend CAGR (Compound Annual Growth Rate)`,
          },
          {
            path: 'share-cagr',
            component: ShareCagrPageComponent,
            title: $localize`How to calculate Share Price CAGR (Compound Annual Growth Rate)`,
          },
          {
            path: 'forecaster-exp',
            component: ForecasterExplanationComponent,
            title: $localize`How to use Investment Forecaster By Jofrey`,
          },
          {
            path: 'compound-interest',
            component: CompoundInterestComponent,
            title: $localize`How to calculate Compound Interest`,
          }
        ]
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
