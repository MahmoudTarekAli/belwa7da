import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe,
  TranslateService
} from "@ngx-translate/core";

import { AppRoutingModule } from "../app.routing";
import { SharedModule } from "../shared/shared.module";
import { UserlayoutComponent } from "./userlayout/userlayout.component";
import {JwtInterceptor} from './interceptor/JwtInterceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [UserlayoutComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule, TranslateModule]
})
export class CoreModule {}
