import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'PORTFOLIO_FORECAST';

  ngOnInit():void {

    if (typeof $ === 'undefined') {
      return;
    }

    $(function () {
      $('body').tooltip({
          selector: '[data-toggle="tooltip"]'
      }).click(function () {
        $('.tooltip.show').removeClass("show");
      });
     })
  }
}
