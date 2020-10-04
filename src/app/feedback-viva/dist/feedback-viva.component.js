"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FeedbackVivaComponent = void 0;
var core_1 = require("@angular/core");
var flag1;
var flag2;
var flag3;
var flag4;
var flag5;
var FeedbackVivaComponent = /** @class */ (function () {
    function FeedbackVivaComponent(route) {
        this.route = route;
        this.data = JSON.parse(localStorage.getItem('Response_data'));
    }
    FeedbackVivaComponent.prototype.ngOnInit = function () {
        var data = this.data;
        $(document).ready(function () {
            $.each(data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                .Questions, function (index, value) {
                var id = (index + 1).toString();
                document.getElementById(id).innerHTML =
                    index +
                        1 +
                        '. ' +
                        data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                            .Questions[index].QuestionText +
                        '<br/>';
                if (data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                    .Questions[index].Options) {
                    $.each(data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                        .Questions[index].Options, function (indices, value) {
                        var opt_id = 'opt' + index + '_' + (indices + 1);
                        document.getElementById(opt_id).innerHTML =
                            data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[index].Options[indices].OptionText;
                    });
                }
            });
            var id1, id2, id3, id4;
            var arr;
            arr = [];
            $('input[name=groupOfDefaultRadios1]').change(function () {
                data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[1].Response =
                    data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                        .Questions[1].QuestionId +
                        '=>' +
                        $(this).val();
                flag1 = true;
                if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    if (document.getElementById('text').value != '') {
                        data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[0].Response =
                            data.CandidateAssessmentData.VivaAssessment
                                .FeedbackQuestionPaper.Questions[0].QuestionId +
                                '=>' +
                                document.getElementById('text').value;
                        $('#next').removeAttr('disabled');
                    }
                }
            });
            $('select[name=groupOfDefaultRadios2]').change(function () {
                data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[2].Response =
                    data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                        .Questions[2].QuestionId +
                        '=>' +
                        $(this).val();
                flag2 = true;
                if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    if (document.getElementById('text').value != '') {
                        data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[0].Response =
                            data.CandidateAssessmentData.VivaAssessment
                                .FeedbackQuestionPaper.Questions[0].QuestionId +
                                '=>' +
                                document.getElementById('text').value;
                        $('#next').removeAttr('disabled');
                    }
                }
            });
            $('input[name=groupOfDefaultRadios3]').change(function () {
                arr.push($(this).val());
                data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[3].Response =
                    data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                        .Questions[3].QuestionId +
                        '=>' +
                        arr;
                flag3 = true;
                if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    if (document.getElementById('text').value != '') {
                        data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[0].Response =
                            data.CandidateAssessmentData.VivaAssessment
                                .FeedbackQuestionPaper.Questions[0].QuestionId +
                                '=>' +
                                document.getElementById('text').value;
                        $('#next').removeAttr('disabled');
                    }
                }
            });
            $('select[name=groupOfDefaultRadios4]').change(function () {
                data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[4].Response =
                    data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper
                        .Questions[4].QuestionId +
                        '=>' +
                        $(this).val();
                flag4 = true;
                if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
                    if (document.getElementById('text').value != '') {
                        data.CandidateAssessmentData.VivaAssessment.FeedbackQuestionPaper.Questions[0].Response =
                            data.CandidateAssessmentData.VivaAssessment
                                .FeedbackQuestionPaper.Questions[0].QuestionId +
                                '=>' +
                                document.getElementById('text').value;
                        $('#next').removeAttr('disabled');
                    }
                }
            });
        });
        this.data = data;
    };
    FeedbackVivaComponent.prototype.clicked = function () {
        this.data.CandidateAssessmentData.VivaAssessment.AssessmentStatus = 3;
        localStorage.setItem('Response_data', JSON.stringify(this.data));
        this.route.navigate(['submit-response']);
    };
    FeedbackVivaComponent = __decorate([
        core_1.Component({
            selector: 'app-feedback-viva',
            templateUrl: './feedback-viva.component.html',
            styleUrls: ['./feedback-viva.component.css']
        })
    ], FeedbackVivaComponent);
    return FeedbackVivaComponent;
}());
exports.FeedbackVivaComponent = FeedbackVivaComponent;
