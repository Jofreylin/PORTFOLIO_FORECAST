import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../../services/calculation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  years: number[] = [];
  forecastData: any[] = [];

  constructor(private investmentService: CalculationService) { }

  ngOnInit(): void {


    for(let i = 1; i <= 40; i++){
      this.years.push(i)
    }

    this.forecastData = this.investmentService.calculateForecast(this.years);
  }
}
