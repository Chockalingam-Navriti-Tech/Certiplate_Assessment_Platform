"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EndImageCaptureComponent = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var EndImageCaptureComponent = /** @class */ (function () {
    function EndImageCaptureComponent(route) {
        this.route = route;
        this.webcamImage1 = null;
        this.trigger = new rxjs_1.Subject();
    }
    EndImageCaptureComponent.prototype.ngOnInit = function () {
        this.sub = localStorage.getItem('assessment');
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
    };
    EndImageCaptureComponent.prototype.triggerSnapshot = function (id_image) {
        this.id = id_image;
        this.trigger.next();
    };
    EndImageCaptureComponent.prototype.handleImage1 = function (webcamImage) {
        if (this.id == 'btn1') {
            this.webcamImage1 = webcamImage;
        }
    };
    Object.defineProperty(EndImageCaptureComponent.prototype, "triggerObservable", {
        get: function () {
            return this.trigger.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    EndImageCaptureComponent.prototype.clicked = function () {
        var lat = localStorage.getItem('lat');
        var long = localStorage.getItem('long');
        var data = JSON.parse(localStorage.getItem('Response_data'));
        var ImageArrayContent = JSON.parse(localStorage.getItem('Image_Array'));
        var ImageArrayObj;
        if (localStorage.getItem('assessment') == 'theory') {
            data.CandidateAssessmentData.TheoryAssessment.EndImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryEnd.png';
            data.CandidateAssessmentData.TheoryAssessment.EndImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            data.CandidateAssessmentData.TheoryAssessment.EndImage.Latitude = lat;
            data.CandidateAssessmentData.TheoryAssessment.EndImage.Longitude = long;
            ImageArrayObj = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_TheoryEnd.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            this.Uploadfiles(ImageArrayObj);
            data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
                DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
                SubTypeId: 24,
                Latitude: lat,
                Longitude: long
            });
            localStorage.setItem('Response_data', JSON.stringify(data));
            this.route.navigate(['feedback-theory']);
        }
        else if (localStorage.getItem('assessment') == 'practical') {
            data.CandidateAssessmentData.PracticalAssessment.EndImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalEnd.png';
            data.CandidateAssessmentData.PracticalAssessment.EndImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            data.CandidateAssessmentData.PracticalAssessment.EndImage.Latitude = lat;
            data.CandidateAssessmentData.PracticalAssessment.EndImage.Longitude = long;
            ImageArrayObj = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalEnd.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj);
            //ocalStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            this.Uploadfiles(ImageArrayObj);
            data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
                DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
                SubTypeId: 24,
                Latitude: lat,
                Longitude: long
            });
            localStorage.setItem('Response_data', JSON.stringify(data));
            this.route.navigate(['feedback-practical']);
        }
        else if (localStorage.getItem('assessment') == 'viva') {
            data.CandidateAssessmentData.VivaAssessment.EndImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaEnd.png';
            data.CandidateAssessmentData.VivaAssessment.EndImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            data.CandidateAssessmentData.VivaAssessment.EndImage.Latitude = lat;
            data.CandidateAssessmentData.VivaAssessment.EndImage.Longitude = long;
            ImageArrayObj = {
                FileName: 'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaEnd.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj);
            this.Uploadfiles(ImageArrayObj);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            data.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push({
                DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
                SubTypeId: 24,
                Latitude: lat,
                Longitude: long
            });
            localStorage.setItem('Response_data', JSON.stringify(data));
            this.route.navigate(['feedback-viva']);
        }
    };
    EndImageCaptureComponent.prototype.Uploadfiles = function (ImageArrayContent) {
        $('#frmImages').append('<input name="image_data" value="' + ImageArrayContent.Image_Data + '">');
        $('#frmImages').append('<input name="image_file_name" value="' +
            ImageArrayContent.FileName +
            '">');
        var varForm = document.getElementById('frmImages');
        $.ajax({
            url: environment_1.environment.Upload_files_URL,
            type: 'POST',
            data: new FormData(varForm),
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                var varResponseData = JSON.parse(response);
                console.log(varResponseData);
            },
            error: function (e) {
                alert('Error');
            }
        });
    };
    EndImageCaptureComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        document
            .getElementById('webcam')
            .parentNode.removeChild(document.getElementById('webcam'));
    };
    EndImageCaptureComponent = __decorate([
        core_1.Component({
            selector: 'app-end-image-capture',
            templateUrl: './end-image-capture.component.html',
            styleUrls: ['./end-image-capture.component.css']
        })
    ], EndImageCaptureComponent);
    return EndImageCaptureComponent;
}());
exports.EndImageCaptureComponent = EndImageCaptureComponent;
