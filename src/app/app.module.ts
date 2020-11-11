import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppComponent} from './app.component';

import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import {CoreModule} from './core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routing';
import {RouterModule} from '@angular/router';
import {MAT_DATE_LOCALE} from '@angular/material';
import {CanActivateViaAuthGuard} from './modules/auth/auth-guard/auth.guard';
import {CanActivateAdminGuard} from './modules/auth/auth-guard/adminAuth.guard';
import {CanActivateLoginGuard} from './modules/auth/auth-guard/login-guard';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/locales/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(routes) // <------
  ],
  exports: [],
  declarations: [AppComponent],
  providers: [CanActivateViaAuthGuard,
    CanActivateLoginGuard,
    CanActivateAdminGuard],

  bootstrap: [AppComponent]
})
export class AppModule {
}
