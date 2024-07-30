import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent implements OnInit {

  isDarkMode = false;

  currentLang: string = 'en';
  oppositeLang: string = 'es';
  currentUrl: string = '';

  constructor(private themeService: ThemeService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.updateLang();
      }
    });
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  updateLang() {
    if (this.currentUrl.startsWith(`/${environment.languages.spanish}`)) {
      this.currentLang = environment.languages.spanish;
      this.oppositeLang = environment.languages.english;
    } else if (this.currentUrl.startsWith(`/${environment.languages.english}`)) {
      this.currentLang = environment.languages.english;
      this.oppositeLang = environment.languages.spanish;
    }
  }

  changeLanguage() {
    const newUrl = this.currentUrl.replace(`/${this.currentLang}`, `/${this.oppositeLang}`);
    this.router.navigateByUrl(newUrl);
  }
  
}
