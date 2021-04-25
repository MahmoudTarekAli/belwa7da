import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { AppRoutingModule } from '../app.routing';
import { SharedModule } from '../shared/shared.module';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { JwtInterceptor } from './interceptor/JwtInterceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  declarations: [UserlayoutComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  exports: [RouterModule, TranslateModule],
})
export class CoreModule {}

// Error: Tried to write C:/Users/moham/Desktop/projects/belwa7da/node_modules/@angular/fire/bundles/database.umd.js.__ivy_ngcc_bak with an ngcc back up file but it already exists so not writing, nor backing up, C:/Users/moham/Desktop/projects/belwa7da/node_modules/@angular/fire/bundles/database.umd.js.
// This error may be because two or more entry-points overlap and ngcc has been asked to process some files more than once.
// You should check other entry-points in this package and set up a config to ignore any that you are not using.
