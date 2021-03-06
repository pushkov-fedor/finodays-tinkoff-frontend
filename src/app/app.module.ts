import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

import { PredictComponent } from './components/predict/predict.component';
import { ToFixedPipe } from './shared/pipes/to-fixed.pipe';
import { PredictionComponent } from './pages/prediction/prediction.component';
import { EditCashbackComponent } from './pages/edit-cashback/edit-cashback.component';
import { OptionsScrollDirective } from './shared/directives/options-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PredictComponent,
    ToFixedPipe,
    PredictionComponent,
    EditCashbackComponent,
    OptionsScrollDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
