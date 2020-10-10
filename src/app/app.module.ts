import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {WebcamModule} from 'ngx-webcam';
import {CountdownModule, CountdownComponent} from 'ngx-countdown';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
// MDB Angular Free
import {
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule,
} from 'angular-bootstrap-md';

import {
  AppRoutingModule,
  routingComponents,
  routes,
} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { TheoryInstructionsComponent } from './theory-instructions/theory-instructions.component';
import { PracticalInstructionsComponent } from './practical-instructions/practical-instructions.component';
import { VivaInstructionsComponent } from './viva-instructions/viva-instructions.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { TheoryAssessmentComponent } from './theory-assessment/theory-assessment.component';
import { EndImageCaptureComponent } from './end-image-capture/end-image-capture.component';
import { FeedbackTheoryComponent } from './feedback-theory/feedback-theory.component';
import { FeedbackPracticalComponent } from './feedback-practical/feedback-practical.component';
import { FeedbackVivaComponent } from './feedback-viva/feedback-viva.component';
import { PracticalAssessmentComponent } from './practical-assessment/practical-assessment.component';
import { SubmitResponseComponent } from './submit-response/submit-response.component';
import { VivaAssessmentComponent } from './viva-assessment/viva-assessment.component';

@NgModule({
  declarations: [AppComponent, routingComponents, NavBarComponent, FooterComponent, TheoryInstructionsComponent, PracticalInstructionsComponent, VivaInstructionsComponent, ImageCaptureComponent, TheoryAssessmentComponent, EndImageCaptureComponent, FeedbackTheoryComponent, FeedbackPracticalComponent, FeedbackVivaComponent, PracticalAssessmentComponent, SubmitResponseComponent, VivaAssessmentComponent],
  imports: [
    WebcamModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CheckboxModule,
    MatRadioModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
    CountdownModule,
    MatCardModule,
    RouterModule.forRoot(routes),
    BackButtonDisableModule.forRoot(),
    MDBBootstrapModule.forRoot(),
  ],
  exports: [BrowserAnimationsModule],
  providers: [CountdownComponent],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
