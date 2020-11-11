import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { AgmCoreModule } from '@agm/core';
import { ImgCacheModule } from 'ng-imgcache';

// components
// import { CounterDirective } from './directive/counter.directive';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizedDatePipe } from './pipes/date.pipe';
import { SavebuttonComponent } from './components/savebutton/savebutton.component';
import { OpenDialogButtonComponent } from './components/open-dialog-button/open-dialog-button.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { CounterDirective } from './directive/counter.directive';
import { ResendCodeComponent } from './components/resend-code/resend-code.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from '../components/components.module';
import { LocalizeRouterModule } from 'localize-router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddButtonComponent } from './components/add-button/add-button.component';
import {CloseDialogButtonComponent} from './components/close-dialog-button/close-dialog-button.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialImportsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAwsSpAS7gv7AA00Ce8ljPKII6lbme6EbU",
      libraries: ['places', 'drawing', 'geometry']
    }),
    ComponentsModule,
    ImgCacheModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    TranslateModule,
    LocalizeRouterModule
  ],
  declarations: [
    TranslatePipe,
    LocalizedDatePipe,
    SavebuttonComponent,
    OpenDialogButtonComponent,
    CloseDialogButtonComponent,
    SpinnerComponent,
    CounterDirective,
    ResendCodeComponent,
    AddButtonComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialImportsModule,
    AgmCoreModule,
    TranslateModule,
    LocalizedDatePipe,
    ImgCacheModule,
    SavebuttonComponent,
    OpenDialogButtonComponent,
    SpinnerComponent,
    CounterDirective,
    ResendCodeComponent,
    ChartsModule,
    NgbModule,
    ToastrModule,
    TranslatePipe,
    ComponentsModule,
    LocalizeRouterModule,
    AddButtonComponent,
    CloseDialogButtonComponent
  ],
  providers: [
    TranslatePipe,
  ],

})
export class SharedModule {

}
