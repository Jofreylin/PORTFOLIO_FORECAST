import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appHighlightInvalid]'
})
export class HighlightInvalidDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) {}

  @HostListener('blur')
  onBlur(): void {
    if (this.control.invalid && (this.control.touched || this.control.dirty)) {
      this.highlight();
    } else {
      this.clearHighlight();
    }
  }

  @HostListener('input')
  onInput(): void {
    if (this.control.valid) {
      this.clearHighlight();
    }
  }

  private highlight(): void {
    this.renderer.addClass(this.el.nativeElement, 'invalid-input');
    this.renderer.addClass(this.el.nativeElement, 'shake');
    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'shake');
    }, 500);
  }

  private clearHighlight(): void {
    this.renderer.removeClass(this.el.nativeElement, 'invalid-input');
  }
}
