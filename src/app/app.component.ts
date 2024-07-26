import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    this.themeService.applyInitialTheme();
  }
}
