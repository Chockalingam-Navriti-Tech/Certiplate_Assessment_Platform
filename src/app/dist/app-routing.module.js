"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.routingComponents = exports.AppRoutingModule = exports.routes = void 0;
var viva_assessment_component_1 = require("./viva-assessment/viva-assessment.component");
var submit_response_component_1 = require("./submit-response/submit-response.component");
var practical_assessment_component_1 = require("./practical-assessment/practical-assessment.component");
var feedback_viva_component_1 = require("./feedback-viva/feedback-viva.component");
var feedback_practical_component_1 = require("./feedback-practical/feedback-practical.component");
var end_image_capture_component_1 = require("./end-image-capture/end-image-capture.component");
var theory_assessment_component_1 = require("./theory-assessment/theory-assessment.component");
var image_capture_component_1 = require("./image-capture/image-capture.component");
var theory_instructions_component_1 = require("./theory-instructions/theory-instructions.component");
var practical_instructions_component_1 = require("./practical-instructions/practical-instructions.component");
var viva_instructions_component_1 = require("./viva-instructions/viva-instructions.component");
var feedback_theory_component_1 = require("./feedback-theory/feedback-theory.component");
var general_instructions_component_1 = require("./general-instructions/general-instructions.component");
var login_component_1 = require("./login/login.component");
var assessment_detail_component_1 = require("./assessment-detail/assessment-detail.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
exports.routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'assessment-details', component: assessment_detail_component_1.AssessmentDetailComponent },
    { path: 'general-instructions', component: general_instructions_component_1.GeneralInstructionsComponent },
    { path: 'theory-instructions', component: theory_instructions_component_1.TheoryInstructionsComponent },
    { path: 'practical-instructions', component: practical_instructions_component_1.PracticalInstructionsComponent },
    { path: 'viva-instructions', component: viva_instructions_component_1.VivaInstructionsComponent },
    { path: 'image-capture', component: image_capture_component_1.ImageCaptureComponent },
    { path: 'theory-assessment', component: theory_assessment_component_1.TheoryAssessmentComponent },
    { path: 'practical-assessment', component: practical_assessment_component_1.PracticalAssessmentComponent },
    { path: 'end-image-capture', component: end_image_capture_component_1.EndImageCaptureComponent },
    { path: 'feedback-theory', component: feedback_theory_component_1.FeedbackTheoryComponent },
    { path: 'feedback-practical', component: feedback_practical_component_1.FeedbackPracticalComponent },
    { path: 'feedback-viva', component: feedback_viva_component_1.FeedbackVivaComponent },
    { path: 'submit-response', component: submit_response_component_1.SubmitResponseComponent },
    { path: 'viva-assessment', component: viva_assessment_component_1.VivaAssessmentComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [
    login_component_1.LoginComponent,
    assessment_detail_component_1.AssessmentDetailComponent,
    general_instructions_component_1.GeneralInstructionsComponent,
    theory_instructions_component_1.TheoryInstructionsComponent,
    practical_instructions_component_1.PracticalInstructionsComponent,
    viva_instructions_component_1.VivaInstructionsComponent,
    image_capture_component_1.ImageCaptureComponent,
    theory_assessment_component_1.TheoryAssessmentComponent,
    practical_assessment_component_1.PracticalAssessmentComponent,
    end_image_capture_component_1.EndImageCaptureComponent,
    feedback_theory_component_1.FeedbackTheoryComponent,
    feedback_practical_component_1.FeedbackPracticalComponent,
    feedback_viva_component_1.FeedbackVivaComponent,
    submit_response_component_1.SubmitResponseComponent,
    viva_assessment_component_1.VivaAssessmentComponent,
];
