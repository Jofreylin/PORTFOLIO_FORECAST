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

  currentLang!: 'en' | 'es';

  constructor(private themeService: ThemeService, private languageSwitcher: LanguageSwitcherService) {
    this.currentLang = this.languageSwitcher.getCurrentLanguage();
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(event: Event) {
    const targetLang = (event.target as HTMLSelectElement).value as 'en' | 'es';
    this.languageSwitcher.switchLanguage(targetLang);
  }
}
