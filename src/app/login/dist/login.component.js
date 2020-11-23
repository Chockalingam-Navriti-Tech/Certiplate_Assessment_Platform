"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var environment_1 = require("src/environments/environment");
var moment = require("moment");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route) {
        this.route = route;
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.test = function () {
        $("#login").css("display", "none");
        $("#log-in").css("display", "block");
        this.username = document.getElementById("username");
        this.password = document.getElementById("pwd");
        if (this.username.value == "" || this.password.value == "") {
            document.getElementById("warning").innerHTML =
                "<b> <h2>" + "Login Id and password field are required" + "</h2></b>";
            $("#login").css("display", "block");
            $("#log-in").css("display", "none");
        }
        else if (this.username && this.password) {
            localStorage.setItem(this.username.value, this.password.value);
            this.login();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        $.ajax({
            url: environment_1.environment.URL_authentication,
            type: "POST",
            dataType: "json",
            data: {
                apiKey: environment_1.environment.api_key,
                RegistrationId: this.username.value,
                password: localStorage.getItem(this.username.value)
            },
            success: function (data) {
                var json = JSON.parse(JSON.stringify(data));
                localStorage.setItem(_this.username.value + "_" + _this.password.value, JSON.stringify(data));
                if (json.CandidateAssessmentAuthentication.Message == "SUCCESS") {
                    var output = moment().format("DD-MMM-YYYY");
                    output = "08-Oct-2020";
                    if (output == json.CandidateAssessmentAuthentication.ScheduledStartDate) {
                        $.ajax({
                            url: environment_1.environment.URL_datarequest,
                            type: "POST",
                            dataType: "json",
                            data: {
                                apiKey: environment_1.environment.api_key,
                                RegistrationId: _this.username.value,
                                password: _this.password.value
                            },
                            success: function (data) {
                                var req = _this.username.value;
                                var cand = _this.password.value;
                                if (localStorage.getItem(req + '_' + cand + '_data')) {
                                    if (localStorage.getItem(req + "_" + cand + "_data")) {
                                        var data = JSON.parse(localStorage.getItem(req + "_" + cand + "_data"));
                                        if (localStorage.getItem("Response_data")) {
                                            data = JSON.parse(localStorage.getItem("Response_data"));
                                        }
                                        if (localStorage.getItem("assessment") == "theory") {
                                            if (data.CandidateAssessmentData.PracticalAssessment) {
                                                if (data.CandidateAssessmentData.TheoryAssessment
                                                    .StartImage.FileName == "" ||
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .IdentityImage.FileName == "")
                                                    _this.route.navigate(["image-capture"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .StartImage.FileName != "" &&
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .IdentityImage.FileName != "" &&
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .AssessmentStatus == "0") {
                                                    _this.route.navigate(["theory-instructions"]);
                                                }
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "1") {
                                                    var element = document.documentElement;
                                                    if (element.requestFullscreen)
                                                        element.requestFullscreen();
                                                    _this.route.navigate(["theory-assessment"]);
                                                }
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "2" &&
                                                    data.CandidateAssessmentData.TheoryAssessment.EndImage
                                                        .FileName == "")
                                                    _this.route.navigate(["end-image-capture"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment.EndImage
                                                    .FileName != "" &&
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .AssessmentStatus == "2")
                                                    _this.route.navigate(["feedback-theory"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "3")
                                                    _this.route.navigate(["submit-response"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "4" &&
                                                    data.CandidateAssessmentData.PracticalAssessment
                                                        .AssessmentStatus != "4")
                                                    _this.route.navigate(["assessment-details"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "4" &&
                                                    data.CandidateAssessmentData.PracticalAssessment
                                                        .AssessmentStatus == "4") {
                                                    document.getElementById("warning").style.backgroundColor = "lawngreen";
                                                    document.getElementById("warning").innerHTML =
                                                        "<b> <h2>" +
                                                            "You have completed the assessment" +
                                                            "</h2></b>";
                                                    $("#login").css("display", "block");
                                                    $("#log-in").css("display", "none");
                                                }
                                            }
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment) {
                                                if (data.CandidateAssessmentData.TheoryAssessment
                                                    .StartImage.FileName == "" ||
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .IdentityImage.FileName == "")
                                                    _this.route.navigate(["image-capture"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .StartImage.FileName != "" &&
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .IdentityImage.FileName != "" &&
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .AssessmentStatus == "0") {
                                                    _this.route.navigate(["theory-instructions"]);
                                                }
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "1") {
                                                    var element = document.documentElement;
                                                    if (element.requestFullscreen)
                                                        element.requestFullscreen();
                                                    _this.route.navigate(["theory-assessment"]);
                                                }
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "2" &&
                                                    data.CandidateAssessmentData.TheoryAssessment.EndImage
                                                        .FileName == "")
                                                    _this.route.navigate(["end-image-capture"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment.EndImage
                                                    .FileName != "" &&
                                                    data.CandidateAssessmentData.TheoryAssessment
                                                        .AssessmentStatus == "2")
                                                    _this.route.navigate(["feedback-theory"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "3")
                                                    _this.route.navigate(["submit-response"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "4" &&
                                                    data.CandidateAssessmentData.VivaMcqAssessment
                                                        .AssessmentStatus != "4")
                                                    _this.route.navigate(["assessment-details"]);
                                                else if (data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "4" &&
                                                    data.CandidateAssessmentData.VivaMcqAssessment
                                                        .AssessmentStatus == "4") {
                                                    document.getElementById("warning").style.backgroundColor = "lawngreen";
                                                    document.getElementById("warning").innerHTML =
                                                        "<b> <h2>" +
                                                            "You have completed the assessment" +
                                                            "</h2></b>";
                                                    $("#login").css("display", "block");
                                                    $("#log-in").css("display", "none");
                                                }
                                            }
                                        }
                                        else if (localStorage.getItem("assessment") == "practical") {
                                            if (data.CandidateAssessmentData.PracticalAssessment
                                                .StartImage.FileName == "" ||
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .IdentityImage.FileName == "")
                                                _this.route.navigate(["image-capture"]);
                                            else if (data.CandidateAssessmentData.PracticalAssessment
                                                .StartImage.FileName != "" &&
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .IdentityImage.FileName != "" &&
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .AssessmentStatus == "0") {
                                                _this.route.navigate(["practical-instructions"]);
                                            }
                                            else if (data.CandidateAssessmentData.PracticalAssessment
                                                .AssessmentStatus == "1") {
                                                var element = document.documentElement;
                                                if (element.requestFullscreen)
                                                    element.requestFullscreen();
                                                _this.route.navigate(["practical-assessment"]);
                                            }
                                            else if (data.CandidateAssessmentData.PracticalAssessment
                                                .AssessmentStatus == "2" &&
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .EndImage.FileName == "")
                                                _this.route.navigate(["end-image-capture"]);
                                            else if (data.CandidateAssessmentData.PracticalAssessment
                                                .EndImage.FileName != "" &&
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .AssessmentStatus == "2")
                                                _this.route.navigate(["feedback-practical"]);
                                            else if (data.CandidateAssessmentData.PracticalAssessment
                                                .AssessmentStatus == "3")
                                                _this.route.navigate(["submit-response"]);
                                            else if (data.CandidateAssessmentData.TheoryAssessment
                                                .AssessmentStatus != "4" &&
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .AssessmentStatus == "4")
                                                _this.route.navigate(["assessment-details"]);
                                            else if (data.CandidateAssessmentData.TheoryAssessment
                                                .AssessmentStatus == "4" &&
                                                data.CandidateAssessmentData.PracticalAssessment
                                                    .AssessmentStatus == "4") {
                                                document.getElementById("warning").style.backgroundColor = "lawngreen";
                                                document.getElementById("warning").innerHTML =
                                                    "<b> <h2>" +
                                                        "You have completed the assessment" +
                                                        "</h2></b>";
                                                $("#login").css("display", "block");
                                                $("#log-in").css("display", "none");
                                            }
                                        }
                                        else if (localStorage.getItem("assessment") == "viva") {
                                            if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .StartImage.FileName == "" ||
                                                data.CandidateAssessmentData.VivaMcqAssessment
                                                    .IdentityImage.FileName == "")
                                                _this.route.navigate(["image-capture"]);
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .StartImage.FileName != "" &&
                                                data.CandidateAssessmentData.VivaMcqAssessment
                                                    .IdentityImage.FileName != "" &&
                                                data.CandidateAssessmentData.VivaMcqAssessment
                                                    .AssessmentStatus == "0") {
                                                _this.route.navigate(["viva-instructions"]);
                                            }
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .AssessmentStatus == "1") {
                                                var element = document.documentElement;
                                                if (element.requestFullscreen)
                                                    element.requestFullscreen();
                                                _this.route.navigate(["viva-assessment"]);
                                            }
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .AssessmentStatus == "2" &&
                                                data.CandidateAssessmentData.VivaMcqAssessment.EndImage
                                                    .FileName == "")
                                                _this.route.navigate(["end-image-capture"]);
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment.EndImage
                                                .FileName != "" &&
                                                data.CandidateAssessmentData.VivaMcqAssessment
                                                    .AssessmentStatus == "2")
                                                _this.route.navigate(["feedback-viva"]);
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .AssessmentStatus == "3")
                                                _this.route.navigate(["submit-response"]);
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .AssessmentStatus == "4" &&
                                                data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus != "4")
                                                _this.route.navigate(["assessment-details"]);
                                            else if (data.CandidateAssessmentData.VivaMcqAssessment
                                                .AssessmentStatus == "4" &&
                                                data.CandidateAssessmentData.TheoryAssessment
                                                    .AssessmentStatus == "4") {
                                                document.getElementById("warning").style.backgroundColor = "lawngreen";
                                                document.getElementById("warning").innerHTML =
                                                    "<b> <h2>" +
                                                        "You have completed the assessment" +
                                                        "</h2></b>";
                                                $("#login").css("display", "block");
                                                $("#log-in").css("display", "none");
                                            }
                                        }
                                        else
                                            _this.route.navigate(["general-instructions"]);
                                    }
                                }
                                else {
                                    var datas = JSON.parse(JSON.stringify(data));
                                    datas.CandidateAssessmentData.TheoryAssessment.AssessmentStatus = 0;
                                    if (datas.CandidateAssessmentData.PracticalAssessment)
                                        datas.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 0;
                                    else
                                        datas.CandidateAssessmentData.VivaMcqAssessment.AssessmentStatus = 0;
                                    localStorage.setItem("req_id", _this.username.value);
                                    localStorage.setItem("cand_id", _this.password.value);
                                    localStorage.setItem(_this.username.value +
                                        "_" +
                                        _this.password.value +
                                        "_" +
                                        "data", JSON.stringify(datas));
                                    _this.route.navigate(["general-instructions"]);
                                }
                            },
                            error: function (err) {
                                console.log("error:" + err);
                            }
                        });
                    }
                    else {
                        document.getElementById("warning").innerHTML =
                            "<b><h2>" +
                                "No assessment has been scheduled for you today! Please contact the system administrator for assistance." +
                                "</h2></b>";
                        $("#login").css("display", "block");
                        $("#log-in").css("display", "none");
                    }
                }
                else {
                    document.getElementById("warning").innerHTML =
                        "<b><h2>" +
                            json.CandidateAssessmentAuthentication.Message +
                            "</h2></b>";
                    $("#login").css("display", "block");
                    $("#log-in").css("display", "none");
                }
            },
            error: function (err) {
                console.log("error:" + err);
                $("#login").css("display", "block");
                $("#log-in").css("display", "none");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.css"]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
