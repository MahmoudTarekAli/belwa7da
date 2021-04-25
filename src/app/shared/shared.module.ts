import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { MaterialImportsModule } from './material-imports/material-imports.module';

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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { CloseDialogButtonComponent } from './components/close-dialog-button/close-dialog-button.component';
<<<<<<< HEAD
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
=======
>>>>>>> d7259e19c610c86f6187bedb6ac9e9effdd8443c

import { environment } from '../../environments/environment';
import { AsyncPipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialImportsModule,
    HttpClientModule,
    ComponentsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    TranslateModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
=======
    LocalizeRouterModule,
>>>>>>> d7259e19c610c86f6187bedb6ac9e9effdd8443c
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
    AddButtonComponent,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialImportsModule,
    TranslateModule,
    LocalizedDatePipe,
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
    AddButtonComponent,
    CloseDialogButtonComponent,
  ],
  providers: [TranslatePipe, AsyncPipe],
})
export class SharedModule {}
