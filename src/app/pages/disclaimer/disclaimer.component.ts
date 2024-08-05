import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.css'
})
export class DisclaimerComponent {

  constructor( private titleService: Title, private metaService: Meta
  ) {
    this.metaService.addTags([
      { name: 'description', content: $localize`Disclaimer, terms and conditions.` },
    ]);

  }
}
