import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
