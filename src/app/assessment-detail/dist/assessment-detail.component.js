"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AssessmentDetailComponent = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var $ = require("jquery");
var AssessmentDetailComponent = /** @class */ (function () {
    function AssessmentDetailComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    AssessmentDetailComponent.prototype.ngOnInit = function () {
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
        this.ajaxcall();
    };
    AssessmentDetailComponent.prototype.ajaxcall = function () {
        var data = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
        $(document).ready(function () {
            if (data.CandidateAssessmentData.Languages[1]) {
                document.getElementById('tablecontent').innerHTML =
                    '<br />' +
                        '<b style="padding:10px"> Candidate Name : </b>' +
                        data.CandidateAssessmentData.CandidateName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Registration Number : </b>' +
                        data.CandidateAssessmentData.RegistrationId +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Guardian Name : </b>' +
                        data.CandidateAssessmentData.GuardianName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Assessment Batch :</b>' +
                        data.CandidateAssessmentData.AssessmentBatchCode.toUpperCase() +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> SDMS Batch ID : </b>' +
                        data.CandidateAssessmentData.SDMSBatchId.toUpperCase() +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Project Name : </b>' +
                        data.CandidateAssessmentData.ProjectName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Client Name : </b>' +
                        data.CandidateAssessmentData.ClientName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Languages : </b>' +
                        data.CandidateAssessmentData.Languages[0].LanguageName +
                        ' and ' +
                        data.CandidateAssessmentData.Languages[1].LanguageName +
                        '<br />' +
                        '<br/>';
            }
            else {
                document.getElementById('tablecontent').innerHTML =
                    '<br />' +
                        '<b style="padding:10px"> Candidate Name : </b>' +
                        data.CandidateAssessmentData.CandidateName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Registration Number : </b>' +
                        data.CandidateAssessmentData.RegistrationId +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Guardian Name : </b>' +
                        data.CandidateAssessmentData.GuardianName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Assessment Batch :</b>' +
                        data.CandidateAssessmentData.AssessmentBatchCode.toUpperCase() +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> SDMS Batch ID : </b>' +
                        data.CandidateAssessmentData.SDMSBatchId.toUpperCase() +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Project Name : </b>' +
                        data.CandidateAssessmentData.ProjectName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Client Name : </b>' +
                        data.CandidateAssessmentData.ClientName +
                        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                        '<b style="padding:10px"> Languages : </b>' +
                        data.CandidateAssessmentData.Languages[0].LanguageName +
                        '<br />' +
                        '<br/>';
            }
            if (data.CandidateAssessmentData.TheoryAssessment) {
                document.getElementById('vid1').style.visibility = 'visible';
                document.getElementById('btn1').style.visibility = 'visible';
            }
            if (data.CandidateAssessmentData.PracticalAssessment) {
                document.getElementById('vid2').style.visibility = 'visible';
                document.getElementById('btn2').style.visibility = 'visible';
            }
            if (data.CandidateAssessmentData.VivaMcqAssessment) {
                document.getElementById('vid3').style.visibility = 'visible';
                document.getElementById('btn3').style.visibility = 'visible';
            }
            if (parseInt(data.CandidateAssessmentData.TheoryAssessment.AssessmentStatus) == 4) {
                document.getElementById('btn1').className = 'btn btn-success';
                document.getElementById('btn1').setAttribute('disabled', 'disabled');
            }
            if (data.CandidateAssessmentData.PracticalAssessment) {
                if (parseInt(data.CandidateAssessmentData.PracticalAssessment.AssessmentStatus) == 4) {
                    document.getElementById('btn2').className = 'btn btn-success';
                    document.getElementById('btn2').setAttribute('disabled', 'disabled');
                }
            }
            else {
                if (parseInt(data.CandidateAssessmentData.VivaMcqAssessment.AssessmentStatus) == 4) {
                    document.getElementById('btn3').className = 'btn btn-success';
                    document.getElementById('btn3').setAttribute('disabled', 'disabled');
                }
            }
        });
    };
    AssessmentDetailComponent.prototype.clicked_theory = function () {
        localStorage.setItem('assessment', 'theory');
        this.route.navigate(['image-capture']);
    };
    AssessmentDetailComponent.prototype.clicked_practical = function () {
        localStorage.setItem('assessment', 'practical');
        this.route.navigate(['image-capture']);
    };
    AssessmentDetailComponent.prototype.clicked_viva = function () {
        localStorage.setItem('assessment', 'viva');
        this.route.navigate(['image-capture']);
    };
    AssessmentDetailComponent.prototype.vid_theory = function () {
        $('#example1').attr('src', environment_1.environment.Theory_TutorialVideo_URL);
        document.getElementById('example1').style.display = 'block';
        document.getElementById('example2').style.display = 'none';
        document.getElementById('example3').style.display = 'none';
        var lightBoxVideo = document.getElementById('example1');
        window.scrollTo(0, 0);
        document.getElementById('light').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
        lightBoxVideo.play();
    };
    AssessmentDetailComponent.prototype.vid_practical = function () {
        $('#example2').attr('src', environment_1.environment.Practical_TutorialVideo_URL);
        document.getElementById('example2').style.display = 'block';
        document.getElementById('example1').style.display = 'none';
        document.getElementById('example3').style.display = 'none';
        var lightBoxVideo = document.getElementById('example2');
        window.scrollTo(0, 0);
        document.getElementById('light').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
        lightBoxVideo.play();
    };
    AssessmentDetailComponent.prototype.vid_viva = function () {
        $('#example3').attr('src', environment_1.environment.Viva_TutorialVideo_URL);
        document.getElementById('example3').style.display = 'block';
        document.getElementById('example2').style.display = 'none';
        document.getElementById('example1').style.display = 'none';
        var lightBoxVideo = document.getElementById('example3');
        window.scrollTo(0, 0);
        document.getElementById('light').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
        lightBoxVideo.play();
    };
    AssessmentDetailComponent.prototype.close = function () {
        var lightBoxVideo1 = document.getElementById('example1');
        var lightBoxVideo2 = document.getElementById('example2');
        var lightBoxVideo3 = document.getElementById('example3');
        document.getElementById('light').style.display = 'none';
        document.getElementById('fade').style.display = 'none';
        lightBoxVideo1.pause();
        lightBoxVideo2.pause();
        lightBoxVideo3.pause();
    };
    AssessmentDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-assessment-detail',
            templateUrl: './assessment-detail.component.html',
            styles: []
        })
    ], AssessmentDetailComponent);
    return AssessmentDetailComponent;
}());
exports.AssessmentDetailComponent = AssessmentDetailComponent;
