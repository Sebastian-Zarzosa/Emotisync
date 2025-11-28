import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export function tokenGetter(){
  return sessionStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingInterceptor, authInterceptor]),
      withInterceptorsFromDi()
    ),
    provideNativeDateAdapter(),
    importProvidersFrom(
      JwtModule.forRoot({
        config:{
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080'],
          disallowedRoutes: ['http://localhost:8080/login/forget']
        }
      })
    ),
    provideCharts(withDefaultRegisterables())
  ],
};
