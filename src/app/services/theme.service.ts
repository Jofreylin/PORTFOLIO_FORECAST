import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDark = new BehaviorSubject<boolean>(this.getPreferredTheme());
  isDarkMode$ = this.isDark.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document){
    
  }

  toggleTheme(): void {
    const isDark = !this.isDark.value;
    this.isDark.next(isDark);
    this.applyTheme(isDark);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

  applyInitialTheme(): void {
    const isDark = this.isDarkMode();
    this.isDark.next(isDark);
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }

  private getPreferredTheme(): boolean {
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return false;
    }
  }

  private isDarkMode(): boolean {
    return this.getPreferredTheme();
  }

}
