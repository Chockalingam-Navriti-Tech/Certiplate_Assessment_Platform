import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VivaAssessmentComponent } from './viva-assessment/viva-assessment.component';
import { SubmitResponseComponent } from './submit-response/submit-response.component';
import { PracticalAssessmentComponent } from './practical-assessment/practical-assessment.component';
import { FeedbackVivaComponent } from './feedback-viva/feedback-viva.component';
import { FeedbackPracticalComponent } from './feedback-practical/feedback-practical.component';
import { EndImageCaptureComponent } from './end-image-capture/end-image-capture.component';
import { TheoryAssessmentComponent } from './theory-assessment/theory-assessment.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { TheoryInstructionsComponent } from './theory-instructions/theory-instructions.component';
import { PracticalInstructionsComponent } from './practical-instructions/practical-instructions.component';
import { VivaInstructionsComponent } from './viva-instructions/viva-instructions.component';
import { FeedbackTheoryComponent } from './feedback-theory/feedback-theory.component';
import { GeneralInstructionsComponent } from './general-instructions/general-instructions.component';
import { LoginComponent } from './login/login.component';
import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProctorCountViewsComponent } from './proctor-count-views/proctor-count-views.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'assessment-details', component: AssessmentDetailComponent },
  { path: 'general-instructions', component: GeneralInstructionsComponent },
  { path: 'theory-instructions', component: TheoryInstructionsComponent },
  { path: 'practical-instructions', component: PracticalInstructionsComponent },
  { path: 'viva-instructions', component: VivaInstructionsComponent },
  { path: 'image-capture', component: ImageCaptureComponent },
  { path: 'theory-assessment', component: TheoryAssessmentComponent },
  { path: 'practical-assessment', component: PracticalAssessmentComponent },
  { path: 'end-image-capture', component: EndImageCaptureComponent },
  { path: 'feedback-theory', component: FeedbackTheoryComponent },
  { path: 'feedback-practical', component: FeedbackPracticalComponent },
  { path: 'feedback-viva', component: FeedbackVivaComponent },
  { path: 'submit-response', component: SubmitResponseComponent },
  { path: 'viva-assessment', component: VivaAssessmentComponent },
  { path: 'proctor-count-views', component: ProctorCountViewsComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  {
    path: 'password_changed_successfully',
    component: ChangePasswordSuccessComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  AssessmentDetailComponent,
  GeneralInstructionsComponent,
  TheoryInstructionsComponent,
  PracticalInstructionsComponent,
  VivaInstructionsComponent,
  ImageCaptureComponent,
  TheoryAssessmentComponent,
  PracticalAssessmentComponent,
  EndImageCaptureComponent,
  FeedbackTheoryComponent,
  FeedbackPracticalComponent,
  FeedbackVivaComponent,
  SubmitResponseComponent,
  VivaAssessmentComponent,
  ProctorCountViewsComponent,
  ChangePasswordComponent,
  ChangePasswordSuccessComponent,
];
