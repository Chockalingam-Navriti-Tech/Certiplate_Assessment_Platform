"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubmitResponseComponent = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var moment = require("moment");
var SubmitResponseComponent = /** @class */ (function () {
    function SubmitResponseComponent(route) {
        this.route = route;
    }
    SubmitResponseComponent.prototype.ngOnInit = function () {
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
    };
    SubmitResponseComponent.prototype.clicked = function () {
        $('#div').css('display', 'none');
        $('#submit').css('display', 'none');
        $('#load').css('display', 'block');
        var response_object = JSON.parse(localStorage.getItem('Response_data'));
        var response_string = JSON.stringify(response_object.CandidateAssessmentData);
        var date = moment().format('YYYYMMDDhhmmss');
        var filename = this.Req + '_' + this.Id + '_' + date + '_response_data.json';
        /*$('#frmImages').append(
          '<input name="response_data" value="' + response + '">'
        );*/
        //var varForm = <HTMLFormElement>document.getElementById('frmImages');
        var varFormdata = new FormData();
        varFormdata.append('response_data', response_string);
        varFormdata.append('response_file_name', filename);
        var data_updated = this.Req + '_' + this.Id + '_data';
        var lat = localStorage.getItem('lat');
        var long = localStorage.getItem('long');
        var response_str = JSON.parse(localStorage.getItem('Response_data'));
        $.ajax({
            url: environment_1.environment.Upload_files_URL,
            type: 'POST',
            data: varFormdata,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                console.log(response);
                $.ajax({
                    url: environment_1.environment.Submit_Responsedata_URL,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        ApiKey: environment_1.environment.api_key,
                        CandidateResponseDataFile: filename,
                        DataCompressed: false
                    },
                    success: function (reply) {
                        $('#div').css('display', 'none');
                        $('#warning').css('display', 'none');
                        console.log(reply);
                        var reply = JSON.parse(JSON.stringify(reply));
                        if (reply.SubmitCandidateAssessmentData.Message == 'Success') {
                            if (localStorage.getItem('assessment') == 'theory') {
                                if (parseInt(reply.SubmitCandidateAssessmentData.TheoryResponse
                                    .TestSubmissionId) > 0) {
                                    $('#load').css('display', 'none');
                                    $('#done').css('display', 'block');
                                    response_str.CandidateAssessmentData.TheoryAssessment.AssessmentStatus = 4;
                                    response_str.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
                                        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                                        SubTypeId: 7,
                                        Latitude: lat,
                                        Longitude: long
                                    });
                                    localStorage.setItem(data_updated, JSON.stringify(response_str));
                                    if (response_str.CandidateAssessmentData.PracticalAssessment) {
                                        if (parseInt(response_str.CandidateAssessmentData.PracticalAssessment
                                            .AssessmentStatus) != 4) {
                                            document.getElementById('btn').style.display = 'block';
                                        }
                                        else if (parseInt(response_str.CandidateAssessmentData.PracticalAssessment
                                            .AssessmentStatus) == 4) {
                                            document.getElementById('success').style.display =
                                                'block';
                                        }
                                    }
                                    else if (response_str.CandidateAssessmentData.VivaAssessment) {
                                        if (parseInt(response_str.CandidateAssessmentData.VivaAssessment
                                            .AssessmentStatus) != 4) {
                                            document.getElementById('btn').style.display = 'block';
                                        }
                                        else if (parseInt(response_str.CandidateAssessmentData.VivaAssessment
                                            .AssessmentStatus) == 4) {
                                            document.getElementById('success').style.display =
                                                'block';
                                        }
                                    }
                                }
                            }
                            else if (localStorage.getItem('assessment') == 'practical') {
                                if (parseInt(reply.SubmitCandidateAssessmentData.PracticalResponse
                                    .TestSubmissionId) > 0) {
                                    $('#load').css('display', 'none');
                                    $('#done').css('display', 'block');
                                    response_str.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 4;
                                    response_str.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
                                        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                                        SubTypeId: 7,
                                        Latitude: lat,
                                        Longitude: long
                                    });
                                    localStorage.setItem(data_updated, JSON.stringify(response_str));
                                    if (parseInt(response_str.CandidateAssessmentData.TheoryAssessment
                                        .AssessmentStatus) != 4) {
                                        document.getElementById('btn').style.display = 'block';
                                    }
                                    else if (parseInt(response_str.CandidateAssessmentData.TheoryAssessment
                                        .AssessmentStatus) == 4) {
                                        document.getElementById('success').style.display = 'block';
                                    }
                                }
                            }
                            else if (localStorage.getItem('assessment') == 'viva') {
                                if (parseInt(reply.SubmitCandidateAssessmentData.VivaMcqResponse
                                    .TestSubmissionId) > 0) {
                                    $('#load').css('display', 'none');
                                    $('#done').css('display', 'block');
                                    response_str.CandidateAssessmentData.VivaAssessment.AssessmentStatus = 4;
                                    response_str.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push({
                                        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                                        SubTypeId: 7,
                                        Latitude: lat,
                                        Longitude: long
                                    });
                                    localStorage.setItem(data_updated, JSON.stringify(response_str));
                                    if (parseInt(response_str.CandidateAssessmentData.TheoryAssessment
                                        .AssessmentStatus) != 4) {
                                        document.getElementById('btn').style.display = 'block';
                                    }
                                    else if (parseInt(response_str.CandidateAssessmentData.TheoryAssessment
                                        .AssessmentStatus) == 4) {
                                        document.getElementById('success').style.display = 'block';
                                    }
                                }
                            }
                        }
                        localStorage.setItem('Response_data', JSON.stringify(response_str));
                    },
                    error: function (e) {
                        $('#load').css('display', 'none');
                        $('#submit').css('display', 'block');
                        $('#div').css('display', 'block');
                        document.getElementById('warning').innerHTML =
                            'Response Data not uploaded. Please try again!';
                        if (localStorage.getItem('assessment') == 'theory') {
                            response_str.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
                                DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                                SubTypeId: 6,
                                Latitude: lat,
                                Longitude: long
                            });
                        }
                        else if (localStorage.getItem('assessment') == 'practical') {
                            response_str.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
                                DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                                SubTypeId: 6,
                                Latitude: lat,
                                Longitude: long
                            });
                        }
                        else if (localStorage.getItem('assessment') == 'viva') {
                            response_str.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push({
                                DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                                SubTypeId: 6,
                                Latitude: lat,
                                Longitude: long
                            });
                        }
                        localStorage.setItem(data_updated, JSON.stringify(response_str));
                        localStorage.setItem('Response_data', JSON.stringify(response_str));
                    }
                });
            },
            error: function (e) {
                $('#load').css('display', 'none');
                $('#submit').css('display', 'block');
                $('#div').css('display', 'block');
                document.getElementById('warning').innerHTML =
                    'Response Data not uploaded. Please try again!';
                if (localStorage.getItem('assessment') == 'theory') {
                    response_str.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
                        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                        SubTypeId: 6,
                        Latitude: lat,
                        Longitude: long
                    });
                }
                else if (localStorage.getItem('assessment') == 'practical') {
                    response_str.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
                        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                        SubTypeId: 6,
                        Latitude: lat,
                        Longitude: long
                    });
                }
                else if (localStorage.getItem('assessment') == 'viva') {
                    response_str.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push({
                        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                        SubTypeId: 6,
                        Latitude: lat,
                        Longitude: long
                    });
                }
                localStorage.setItem(data_updated, JSON.stringify(response_str));
                localStorage.setItem('Response_data', JSON.stringify(response_str));
            }
        });
    };
    SubmitResponseComponent.prototype.assessment = function () {
        this.route.navigate(['assessment-details']);
    };
    SubmitResponseComponent.prototype.finished = function () {
        this.route.navigate(['login']);
    };
    SubmitResponseComponent = __decorate([
        core_1.Component({
            selector: 'app-submit-response',
            templateUrl: './submit-response.component.html',
            styleUrls: ['./submit-response.component.css']
        })
    ], SubmitResponseComponent);
    return SubmitResponseComponent;
}());
exports.SubmitResponseComponent = SubmitResponseComponent;
