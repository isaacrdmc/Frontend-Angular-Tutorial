import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),    // * Configuramos el sistema de rutas de la Aplicación
    provideHttpClient(),    // * Habilitamos el uso de HttpClient para poder hacer peticiones HTTP
    provideAnimationsAsync(),    // * Activamos las animaciones de Angular
    provideZoneChangeDetection({ eventCoalescing: true }),    // ? Mejoramos el rendimiento agrupando eventos similares
    provideClientHydration(withEventReplay())    // ? Habilita SSR + CSR con soporte para repetir eventos del usuario
  ]
};
