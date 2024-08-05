import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-forecaster-explanation',
  templateUrl: './forecaster-explanation.component.html',
  styleUrl: './forecaster-explanation.component.css'
})
export class ForecasterExplanationComponent {

  constructor( private titleService: Title, private metaService: Meta
  ) {

    this.metaService.addTags([
      { name: 'description', content: $localize`Learn how to use the Investment Forecaster By Jofrey.` },
    ]);

  }
}
