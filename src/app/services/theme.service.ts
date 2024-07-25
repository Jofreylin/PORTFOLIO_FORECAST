import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new BehaviorSubject<boolean>(this.isDarkMode());

  isDarkMode$ = this.darkMode.asObservable();

  toggleTheme() {
    const isDark = !this.darkMode.value;
    this.darkMode.next(isDark);

    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private isDarkMode(): boolean {
    return (typeof localStorage !== 'undefined') ? (localStorage.getItem('theme') === 'dark') : false;
  }
}
