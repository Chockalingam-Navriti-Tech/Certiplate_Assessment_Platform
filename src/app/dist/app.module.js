"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var angular_bootstrap_md_1 = require("angular-bootstrap-md");
var ngx_webcam_1 = require("ngx-webcam");
var ngx_countdown_1 = require("ngx-countdown");
var radio_1 = require("@angular/material/radio");
var card_1 = require("@angular/material/card");
var angular_disable_browser_back_button_1 = require("angular-disable-browser-back-button");
// MDB Angular Free
var angular_bootstrap_md_2 = require("angular-bootstrap-md");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var nav_bar_component_1 = require("./nav-bar/nav-bar.component");
var footer_component_1 = require("./footer/footer.component");
var theory_instructions_component_1 = require("./theory-instructions/theory-instructions.component");
var practical_instructions_component_1 = require("./practical-instructions/practical-instructions.component");
var viva_instructions_component_1 = require("./viva-instructions/viva-instructions.component");
var image_capture_component_1 = require("./image-capture/image-capture.component");
var theory_assessment_component_1 = require("./theory-assessment/theory-assessment.component");
var end_image_capture_component_1 = require("./end-image-capture/end-image-capture.component");
var feedback_theory_component_1 = require("./feedback-theory/feedback-theory.component");
var feedback_practical_component_1 = require("./feedback-practical/feedback-practical.component");
var feedback_viva_component_1 = require("./feedback-viva/feedback-viva.component");
var practical_assessment_component_1 = require("./practical-assessment/practical-assessment.component");
var submit_response_component_1 = require("./submit-response/submit-response.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, app_routing_module_1.routingComponents, nav_bar_component_1.NavBarComponent, footer_component_1.FooterComponent, theory_instructions_component_1.TheoryInstructionsComponent, practical_instructions_component_1.PracticalInstructionsComponent, viva_instructions_component_1.VivaInstructionsComponent, image_capture_component_1.ImageCaptureComponent, theory_assessment_component_1.TheoryAssessmentComponent, end_image_capture_component_1.EndImageCaptureComponent, feedback_theory_component_1.FeedbackTheoryComponent, feedback_practical_component_1.FeedbackPracticalComponent, feedback_viva_component_1.FeedbackVivaComponent, practical_assessment_component_1.PracticalAssessmentComponent, submit_response_component_1.SubmitResponseComponent],
            imports: [
                ngx_webcam_1.WebcamModule,
                input_1.MatInputModule,
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                button_1.MatButtonModule,
                animations_1.BrowserAnimationsModule,
                angular_bootstrap_md_2.CheckboxModule,
                radio_1.MatRadioModule,
                angular_bootstrap_md_2.WavesModule,
                angular_bootstrap_md_2.ButtonsModule,
                angular_bootstrap_md_2.InputsModule,
                angular_bootstrap_md_2.IconsModule,
                angular_bootstrap_md_2.CardsModule,
                ngx_countdown_1.CountdownModule,
                card_1.MatCardModule,
                router_1.RouterModule.forRoot(app_routing_module_1.routes),
                angular_disable_browser_back_button_1.BackButtonDisableModule.forRoot(),
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
            ],
            exports: [animations_1.BrowserAnimationsModule],
            providers: [ngx_countdown_1.CountdownComponent],
            entryComponents: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
