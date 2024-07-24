import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    if(typeof localStorage === 'undefined'){
      return;
    }

    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private loadTheme(): void {
    if(typeof localStorage === 'undefined'){
      return;
    }
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      this.isDarkMode = darkMode === 'true';
      this.applyTheme();
    }
  }
}
