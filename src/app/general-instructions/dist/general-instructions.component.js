"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GeneralInstructionsComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var GeneralInstructionsComponent = /** @class */ (function () {
    function GeneralInstructionsComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    GeneralInstructionsComponent.prototype.ngOnInit = function () {
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
        this.ajaxcall();
    };
    GeneralInstructionsComponent.prototype.ajaxcall = function () {
        var data = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
        $(document).ready(function () {
            document.getElementById('instruction').innerHTML =
                '<br />' +
                    '<b style="padding:10px"> 1 : </b>' +
                    '<b> ' +
                    data.CandidateAssessmentData.GeneralInstructions[0].InstructionList[0] +
                    '</b>' +
                    "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
                    '<b style="padding:10px"> 2 : </b>' +
                    '<b>' +
                    data.CandidateAssessmentData.GeneralInstructions[0].InstructionList[1] +
                    '</b>' +
                    '<br />' +
                    '<br/>';
            $('#materialchecked').click(function () {
                //check if checkbox is checked
                if ($(this).is(':checked')) {
                    $('#submit_button').removeAttr('disabled'); //enable input
                }
                else {
                    $('#submit_button').attr('disabled', 'disabled'); //disable input
                }
            });
        });
    };
    GeneralInstructionsComponent.prototype.clicked = function () {
        this.route.navigate([
            'assessment-details'
        ]);
    };
    GeneralInstructionsComponent = __decorate([
        core_1.Component({
            selector: 'app-general-instructions',
            templateUrl: './general-instructions.component.html',
            styleUrls: ['./general-instructions.component.css']
        })
    ], GeneralInstructionsComponent);
    return GeneralInstructionsComponent;
}());
exports.GeneralInstructionsComponent = GeneralInstructionsComponent;
