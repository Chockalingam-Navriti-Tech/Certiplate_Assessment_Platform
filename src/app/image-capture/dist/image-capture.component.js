"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageCaptureComponent = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var ImageCaptureComponent = /** @class */ (function () {
    function ImageCaptureComponent(router, route) {
        this.router = router;
        this.route = route;
        this.webcamImage1 = null;
        this.webcamImage2 = null;
        this.trigger = new rxjs_1.Subject();
    }
    ImageCaptureComponent.prototype.ngOnInit = function () {
        this.sub = localStorage.getItem('assessment');
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
    };
    ImageCaptureComponent.prototype.triggerSnapshot = function (id_image) {
        this.id = id_image;
        this.trigger.next();
    };
    ImageCaptureComponent.prototype.handleImage1 = function (webcamImage) {
        if (this.id == 'btn1') {
            this.webcamImage1 = webcamImage;
        }
        if (this.id == 'btn2') {
            this.webcamImage2 = webcamImage;
        }
    };
    Object.defineProperty(ImageCaptureComponent.prototype, "triggerObservable", {
        get: function () {
            return this.trigger.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    ImageCaptureComponent.prototype.clicked = function () {
        var data = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
        var ImageArrayObj_start, ImageArrayObj_Id;
        var ImageArrayContent = {
            ImageArray: []
        };
        var Req = this.Req;
        var Id = this.Id;
        if (this.sub == 'theory') {
            data.CandidateAssessmentData.TheoryAssessment.StartImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_TheoryStart.png';
            data.CandidateAssessmentData.TheoryAssessment.StartImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            ImageArrayObj_start = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_TheoryStart.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            ImageArrayContent.ImageArray.push(ImageArrayObj_start);
            data.CandidateAssessmentData.TheoryAssessment.IdentityImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryId.png';
            data.CandidateAssessmentData.TheoryAssessment.IdentityImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            ImageArrayObj_Id = {
                FileName: 'REG' + data.CandidateAssessmentData.RegistrationId + '_TheoryId.png',
                Image_Data: this.webcamImage2.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
            this.Uploadfiles(ImageArrayObj_start);
            this.Uploadfiles(ImageArrayObj_Id);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            var lat_1, long_1;
            navigator.geolocation.getCurrentPosition(function (position) {
                lat_1 = position.coords.latitude;
                long_1 = position.coords.longitude;
                data.CandidateAssessmentData.TheoryAssessment.StartImage.Latitude = lat_1;
                data.CandidateAssessmentData.TheoryAssessment.StartImage.Longitude = long_1;
                data.CandidateAssessmentData.TheoryAssessment.IdentityImage.Latitude = lat_1;
                data.CandidateAssessmentData.TheoryAssessment.IdentityImage.Longitude = long_1;
                localStorage.setItem('lat', lat_1);
                localStorage.setItem('long', long_1);
                data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push({
                    DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
                    SubTypeId: 24,
                    Latitude: lat_1,
                    Longitude: long_1
                });
                localStorage.setItem(Req + '_' + Id + '_' + 'data', JSON.stringify(data));
            });
            this.route.navigate(['theory-instructions']);
        }
        else if (this.sub == 'practical') {
            data.CandidateAssessmentData.PracticalAssessment.StartImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalStart.png';
            data.CandidateAssessmentData.PracticalAssessment.StartImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            ImageArrayObj_start = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalStart.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            ImageArrayContent.ImageArray.push(ImageArrayObj_start);
            data.CandidateAssessmentData.PracticalAssessment.IdentityImage.FileName =
                'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalId.png';
            data.CandidateAssessmentData.PracticalAssessment.IdentityImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            ImageArrayObj_Id = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_PracticalId.png',
                Image_Data: this.webcamImage2.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
            this.Uploadfiles(ImageArrayObj_start);
            this.Uploadfiles(ImageArrayObj_Id);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            var lat_2, long_2;
            navigator.geolocation.getCurrentPosition(function (position) {
                lat_2 = position.coords.latitude;
                long_2 = position.coords.longitude;
                data.CandidateAssessmentData.PracticalAssessment.StartImage.Latitude = lat_2;
                data.CandidateAssessmentData.PracticalAssessment.StartImage.Longitude = long_2;
                data.CandidateAssessmentData.PracticalAssessment.IdentityImage.Latitude = lat_2;
                data.CandidateAssessmentData.PracticalAssessment.IdentityImage.Longitude = long_2;
                localStorage.setItem('lat', lat_2);
                localStorage.setItem('long', long_2);
                data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
                    DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
                    SubTypeId: 24,
                    Latitude: lat_2,
                    Longitude: long_2
                });
                localStorage.setItem(Req + '_' + Id + '_' + 'data', JSON.stringify(data));
            });
            this.route.navigate(['practical-instructions']);
        }
        else if (this.sub == 'viva') {
            data.CandidateAssessmentData.VivaAssessment.StartImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaStart.png';
            data.CandidateAssessmentData.VivaAssessment.StartImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            ImageArrayObj_start = {
                FileName: 'REG' +
                    data.CandidateAssessmentData.RegistrationId +
                    '_VivaStart.png',
                Image_Data: this.webcamImage1.imageAsDataUrl
            };
            ImageArrayContent.ImageArray.push(ImageArrayObj_start);
            data.CandidateAssessmentData.VivaAssessment.IdentityImage.FileName =
                'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaId.png';
            data.CandidateAssessmentData.VivaAssessment.IdentityImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            ImageArrayObj_Id = {
                FileName: 'REG' + data.CandidateAssessmentData.RegistrationId + '_VivaId.png',
                Image_Data: this.webcamImage2.imageAsDataUrl
            };
            //ImageArrayContent.ImageArray.push(ImageArrayObj_Id);
            this.Uploadfiles(ImageArrayObj_start);
            this.Uploadfiles(ImageArrayObj_Id);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            var lat_3, long_3;
            navigator.geolocation.getCurrentPosition(function (position) {
                lat_3 = position.coords.latitude;
                long_3 = position.coords.longitude;
                data.CandidateAssessmentData.VivaAssessment.StartImage.Latitude = lat_3;
                data.CandidateAssessmentData.VivaAssessment.StartImage.Longitude = long_3;
                data.CandidateAssessmentData.VivaAssessment.IdentityImage.Latitude = lat_3;
                data.CandidateAssessmentData.VivaAssessment.IdentityImage.Longitude = long_3;
                localStorage.setItem('lat', lat_3);
                localStorage.setItem('long', long_3);
                data.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push({
                    DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
                    SubTypeId: 24,
                    Latitude: lat_3,
                    Longitude: long_3
                });
                localStorage.setItem(Req + '_' + Id + '_' + 'data', JSON.stringify(data));
            });
            this.route.navigate(['viva-instructions']);
        }
    };
    ImageCaptureComponent.prototype.Uploadfiles = function (ImageArrayContent) {
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
                console.log(response);
            },
            error: function (e) {
                alert('Error');
            }
        });
    };
    ImageCaptureComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        document
            .getElementById('webcam')
            .parentNode.removeChild(document.getElementById('webcam'));
    };
    ImageCaptureComponent = __decorate([
        core_1.Component({
            selector: 'app-image-capture',
            templateUrl: './image-capture.component.html',
            styleUrls: ['./image-capture.component.css']
        })
    ], ImageCaptureComponent);
    return ImageCaptureComponent;
}());
exports.ImageCaptureComponent = ImageCaptureComponent;
