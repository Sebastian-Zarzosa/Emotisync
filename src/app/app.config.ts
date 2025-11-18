import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
<<<<<<< HEAD
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
=======
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';
>>>>>>> 654b3bb999bd9aa90635983f1bd87852b4769c95

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
<<<<<<< HEAD
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ]
=======
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
  ],
>>>>>>> 654b3bb999bd9aa90635983f1bd87852b4769c95
};
