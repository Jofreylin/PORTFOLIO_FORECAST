import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageSwitcherService } from '../../services/language-switcher.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent implements OnInit {

  isDarkMode = false;

  constructor(private themeService: ThemeService, private languageSwitcher: LanguageSwitcherService) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeToEnglish() {
    this.languageSwitcher.switchLanguage('en');
  }

  changeToSpanish() {
    this.languageSwitcher.switchLanguage('es');
  }
}
