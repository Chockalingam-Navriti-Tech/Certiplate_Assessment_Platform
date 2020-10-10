"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TheoryInstructionsComponent = void 0;
var core_1 = require("@angular/core");
var TheoryInstructionsComponent = /** @class */ (function () {
    function TheoryInstructionsComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    TheoryInstructionsComponent.prototype.ngOnInit = function () {
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
        var varCandidateAssessmentData = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
        $(function () {
            if (varCandidateAssessmentData.CandidateAssessmentData.Languages[1]) {
                document.getElementById(varCandidateAssessmentData.CandidateAssessmentData.Languages[1]
                    .LanguageName).style.display = 'block';
            }
        });
        $(document).ready(function () {
            function disablePrev() {
                window.history.forward();
            }
            //window.onload = disablePrev();
            window.onpageshow = function (evt) {
                if (evt.persisted)
                    disablePrev();
            };
        });
        this.func();
    };
    TheoryInstructionsComponent.prototype.func = function () {
        var data = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
        $(document).ready(function () {
            var count = 1;
            $.each(data.CandidateAssessmentData.TheoryInstructions[0].InstructionList, function (index, value) {
                document.getElementById('tablecontent').innerHTML +=
                    '<br/>' +
                        '<b style="padding:14px">' +
                        count +
                        ': </b>' +
                        '<b style="padding:10px">' +
                        value +
                        ' </b>' +
                        '<br/>' +
                        '<br/>' +
                        "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
                count += 1;
            });
            $('#materialchecked').click(function () {
                if ($(this).is(':checked')) {
                    $('#submit_button').removeAttr('disabled');
                }
                else {
                    $('#submit_button').attr('disabled', 'disabled');
                }
            });
        });
    };
    TheoryInstructionsComponent.prototype.clicked = function () {
        var element = document.documentElement;
        if (element.requestFullscreen)
            element.requestFullscreen();
        this.route.navigate(['theory-assessment']);
    };
    TheoryInstructionsComponent = __decorate([
        core_1.Component({
            selector: 'app-theory-instructions',
            templateUrl: './theory-instructions.component.html',
            styleUrls: ['./theory-instructions.component.css']
        })
    ], TheoryInstructionsComponent);
    return TheoryInstructionsComponent;
}());
exports.TheoryInstructionsComponent = TheoryInstructionsComponent;
