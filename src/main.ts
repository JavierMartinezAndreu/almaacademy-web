import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { importProvidersFrom, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/core/mocks/in-memory-data.service';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers!,
    importProvidersFrom(
      HttpClientModule,
      ...(isDevMode() ? [HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        delay: 300,
        apiBase: '/api/',
      })] : [])
    )
  ]
}).catch(err => console.error(err));
