import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import katex from 'katex';

@Directive({
  selector: '[appKatex]'
})
export class KatexDirective implements OnChanges {
  
  @Input() appKatex!: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appKatex) {

      if(typeof document === 'undefined'){
        return;
      }

      katex.render(this.appKatex, this.el.nativeElement, {
        throwOnError: false
      });
    }
  }
}