import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageSwitcherService {

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {}

  switchLanguage(targetLang: 'en' | 'es') {
    if (isPlatformBrowser(this.platformId)) {
      const currentUrl = this.document.location.href;
      const newUrl = this.getNewUrl(currentUrl, targetLang);
      this.document.location.href = newUrl;
    }
  }

  private getNewUrl(currentUrl: string, targetLang: 'en' | 'es'): string {
    return currentUrl.replace(/\/(en|es)\//, `/${targetLang}/`);
  }
}
