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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'calculator',
        component: CalculatorComponent
      },
      {
        path: "disclaimer",
        component: DisclaimerComponent
      },
      {
        path: 'how-to',
        component: HowToComponent
      },
      {
        path: 'how-to/dividend-cagr',
        component: DividendCagrPageComponent
      },
      {
        path: 'how-to/share-cagr',
        component: ShareCagrPageComponent
      },
      {
        path: 'how-to/forecaster-exp',
        component: ForecasterExplanationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
