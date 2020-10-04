"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PracticalAssessmentComponent = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var html2canvas_1 = require("html2canvas");
var moment = require("moment");
var option;
var id = 0;
var count;
var localstream;
var count_cam = 0;
var index;
var sec;
var quest;
var fullscreen = 0;
var tab_switch_count = 0;
var exit_full_screen = 0;
var attempted_count;
var marked_review = 0;
var timer = false;
var id1, id2, id3;
var varCandidateAssessmentData;
var PracticalAssessmentComponent = /** @class */ (function () {
    function PracticalAssessmentComponent(route) {
        this.route = route;
        this.constraints = {
            video: {
                facingMode: 'user',
                width: 1280,
                height: 720
            },
            audio: false
        };
        this.Req = localStorage.getItem('req_id');
        this.Id = localStorage.getItem('cand_id');
        this.data = JSON.parse(localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data'));
    }
    PracticalAssessmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        varCandidateAssessmentData = this.data;
        $(function () {
            if (varCandidateAssessmentData.CandidateAssessmentData.Languages[1]
                .LanguageName) {
                document.getElementById(varCandidateAssessmentData.CandidateAssessmentData.Languages[1]
                    .LanguageName).style.display = 'block';
            }
        });
        var id = $('#card').attr('id');
        var nos = 1;
        var i_length = varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
            .Sections.length;
        for (var i = 0; i < i_length; i++) {
            $('#card').append('<div class="row justify-content-center">' +
                '<p class="card-text">Section-' +
                (i + 1) +
                '</p><br /></div>' +
                '<div class="row justify-content-center">');
            var j_length = varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
                .Sections[i].Questions.length;
            for (var j = 0; j < j_length; j++) {
                var ids = 'sec' + (i + 1) + '_' + (j + 1);
                var vid_id = 'video' + (i + 1) + '_' + (j + 1);
                $('#card').append('<button id="' +
                    ids +
                    '" type= "button" class="btn btn-danger px-3" value="' +
                    nos +
                    '" >' +
                    nos +
                    '</button>');
                $('#vid').append('<video id="' +
                    vid_id +
                    '" playsinline class="video-js vjs-default-skin" style="display: none"></video>');
                nos += 1;
            }
            $('#card').append('</div>');
        }
        var clicked = this.clicked;
        $(function () {
            $('button').click(function () {
                if (this.id.startsWith('sec')) {
                    var section = this.id.split('_');
                    clicked(section[0].charAt(section[0].length - 1), section[1], this.textContent);
                }
            });
        });
        var VideoContent = {
            VideoArray: []
        };
        //document.addEventListener('contextmenu', event => event.preventDefault());
        $('body').bind('cut copy paste', function (e) {
            e.preventDefault();
        });
        var datas = this.data;
        $(function () {
            if (datas.CandidateAssessmentData.PracticalAssessment
                .AssessmentStartDateTime == '')
                datas.CandidateAssessmentData.PracticalAssessment.AssessmentStartDateTime = moment().format('DD-MMM-YYYY h:mm:ss a');
            $.each(datas.CandidateAssessmentData.PracticalAssessment.Sections, function (index, value) {
                $.each(datas.CandidateAssessmentData.PracticalAssessment.Sections[index]
                    .Questions, function (ind, values) {
                    if (datas.CandidateAssessmentData.PracticalAssessment.Sections[index].Questions[ind].CandidateActualResponseOption != '-1') {
                        var sections = 'sec' + (index + 1) + '_' + (ind + 1);
                        document.getElementById(sections).className =
                            'btn btn-success px-3';
                    }
                });
            });
        });
        var route = this.route;
        var minutes = Math.floor(3600 / 60);
        var seconds = 3600 - minutes * 60;
        document.getElementById('info1').innerHTML =
            '<b>Candidate Name : ' +
                this.data.CandidateAssessmentData.CandidateName +
                '</b>' +
                '<br/>' +
                '<b>Registration Id : ' +
                this.data.CandidateAssessmentData.RegistrationId +
                '</b>';
        document.getElementById('info2').innerHTML =
            '<b>Question Paper Title : ' +
                this.data.CandidateAssessmentData.QuestionPaperTitle.toUpperCase() +
                '</b>' +
                '<br/>' +
                '<b>Sections : ' +
                this.data.CandidateAssessmentData.PracticalAssessment.Sections.length +
                '</b>';
        document.getElementById('info3').innerHTML =
            '<b>Job : ' +
                this.data.CandidateAssessmentData.QualificationPackName.toUpperCase() +
                '</b>' +
                '<br/>' +
                '<b>Duration : ' +
                minutes +
                ' m : ' +
                seconds +
                ' s' +
                '</b>';
        sec = 0;
        count = 1;
        document.addEventListener('visibilitychange', (this.visibility = function () {
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('ASSESSMENT_VIOLATION', datas, sec, index, key);
            if (document.hidden) {
                $('#popup').css({
                    opacity: 1
                });
                if (tab_switch_count == 3) {
                    document.getElementById('message').innerHTML =
                        '<h1>' +
                            'Please make sure that you dont leave this page<br><br>You only have no chances left<br>' +
                            '</h1>';
                }
                else if (tab_switch_count < 3) {
                    document.getElementById('message').innerHTML =
                        '<h1>' +
                            'Please make sure that you dont leave this page<br><br>You only have ' +
                            (3 - (tab_switch_count + 1)) +
                            ' chances left<br>' +
                            '</h1>';
                }
                $('.fullscreen-container').fadeTo(200, 1);
                $('#ok').click(function () {
                    if (tab_switch_count < 3) {
                        tab_switch_count += 1;
                        $('#popup').css({
                            opacity: 0
                        });
                        $('.fullscreen-container').fadeOut(200);
                        var docElm = document.documentElement;
                        if (docElm.requestFullscreen) {
                            docElm.requestFullscreen();
                        }
                    }
                    else if (tab_switch_count >= 3) {
                        $('#popup').css({
                            opacity: 1
                        });
                        document.getElementById('message').innerHTML =
                            '<h1>' + 'You have violated the rules<br>' + '</h1>';
                        $('.fullscreen-container').fadeTo(200, 1);
                        $('#ok').click(function () {
                            exit_full_screen = 0;
                            tab_switch_count = 0;
                            fullscreen = 0;
                            route.navigate(['login']);
                        });
                    }
                });
            }
        }));
        document.addEventListener('fullscreenchange', (this.full_screen = function () {
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('ASSESSMENT_VIOLATION', datas, sec, index, key);
            if (fullscreen % 2 != 0) {
                $('#popup').css({
                    opacity: 1
                });
                if (exit_full_screen == 3) {
                    document.getElementById('message').innerHTML =
                        '<h1>' +
                            'You cannot leave Full Screen Mode<br><br>You have no attempts left<br>' +
                            '</h1>';
                }
                else if (exit_full_screen < 3) {
                    document.getElementById('message').innerHTML =
                        '<h1>' +
                            'You cannot leave Full Screen Mode<br><br>You only have ' +
                            (3 - (exit_full_screen + 1)) +
                            ' chances left<br>' +
                            '</h1>';
                }
                $('.fullscreen-container').fadeTo(200, 1);
                $('#ok').click(function () {
                    if (exit_full_screen < 3) {
                        exit_full_screen += 1;
                        $('#popup').css({
                            opacity: 0
                        });
                        $('.fullscreen-container').fadeOut(200);
                        var docElm = document.documentElement;
                        $(document).ready(function () {
                            if (docElm.requestFullscreen) {
                                docElm.requestFullscreen();
                            }
                        });
                    }
                    else if (exit_full_screen >= 3) {
                        $('#popup').css({
                            opacity: 1,
                            display: 'block'
                        });
                        document.getElementById('message').innerHTML =
                            '<h1>' + 'You have violated the rules<br>' + '</h1>';
                        $('.fullscreen-container').fadeTo(200, 1);
                        $('#ok').click(function () {
                            exit_full_screen = 0;
                            tab_switch_count = 0;
                            fullscreen = 0;
                            route.navigate(['login']);
                        });
                    }
                });
            }
            fullscreen += 1;
        }));
        this.data.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 1;
        var counting = 0;
        var ImageArrayObj;
        var lat = localStorage.getItem('lat');
        var long = localStorage.getItem('long');
        var Uploadfiles = this.Uploadfiles;
        var data = this.data;
        id3 = setInterval(function () {
            //console.log(document.getElementById('countdown').getAttribute('[config]'));
            localStorage.setItem(_this.Req + '_' + _this.Id + '_' + 'data', JSON.stringify(data));
            localStorage.setItem('Response_data', JSON.stringify(data));
        }, 5000);
        id1 = setInterval(function () {
            html2canvas_1["default"](document.body).then(function (canvas) {
                var ScreenshotImage = {
                    Filename: '',
                    TimeStamp: '',
                    Latitude: '',
                    Longitude: ''
                };
                ScreenshotImage.Filename =
                    'REG' +
                        data.CandidateAssessmentData.RegistrationId +
                        '_PracticalScreenShot_{' +
                        counting +
                        '}.jpeg';
                ScreenshotImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
                ScreenshotImage.Latitude = lat;
                ScreenshotImage.Longitude = long;
                ImageArrayObj = {
                    FileName: '',
                    Image_Data: ''
                };
                ImageArrayObj.FileName =
                    'REG' +
                        data.CandidateAssessmentData.RegistrationId +
                        '_PracticalScreenShot_{' +
                        counting +
                        '}.jpeg';
                ImageArrayObj.Image_Data = canvas.toDataURL('image/jpeg');
                // ImageArrayContent.ImageArray.push(ImageArrayObj);
                //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
                data.CandidateAssessmentData.PracticalAssessment.ScreenshotImages.push(ScreenshotImage);
                counting += 1;
                Uploadfiles(ImageArrayObj);
            });
            localStorage.setItem('Response_data', JSON.stringify(data));
        }, 30000);
        var constraints = this.constraints;
        var countings = 0;
        $(function () {
            navigator.getUserMedia(constraints, function (stream) {
                var video = document.getElementById('video');
                video.srcObject = stream;
                localstream = stream;
                id2 = setInterval(function () {
                    var canvas_vid = (document.getElementById('canvas'));
                    canvas_vid.width = video.videoWidth;
                    canvas_vid.height = video.videoHeight;
                    canvas_vid.getContext('2d').drawImage(video, 0, 0);
                    var varcanvas = canvas_vid.toDataURL('image/jpeg');
                    if (video.srcObject != null) {
                        var SnapshotImage = {
                            Filename: '',
                            TimeStamp: '',
                            Latitude: '',
                            Longitude: ''
                        };
                        SnapshotImage.Filename =
                            'REG' +
                                data.CandidateAssessmentData.RegistrationId +
                                '_PracticalSnapShot_{' +
                                countings +
                                '}.jpeg';
                        SnapshotImage.TimeStamp = moment().format('DD-MMM-YYYY hh:mm:ss a');
                        SnapshotImage.Latitude = lat;
                        SnapshotImage.Longitude = long;
                        ImageArrayObj = {
                            FileName: '',
                            Image_Data: ''
                        };
                        ImageArrayObj.FileName =
                            'REG' +
                                data.CandidateAssessmentData.RegistrationId +
                                '_PracticalSnapShot_{' +
                                countings +
                                '}.jpeg';
                        ImageArrayObj.Image_Data = varcanvas;
                        //ImageArrayContent.ImageArray.push(ImageArrayObj);
                        //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
                        data.CandidateAssessmentData.PracticalAssessment.SnapshotImages.push(SnapshotImage);
                        countings += 1;
                        Uploadfiles(ImageArrayObj);
                    }
                    localStorage.setItem('Response_data', JSON.stringify(data));
                }, 30000);
            }, function (err) {
                alert('there was an error ' + err);
            });
        });
        this.data = data;
        this.initial();
    };
    PracticalAssessmentComponent.prototype.initial = function () {
        var data = this.data;
        var ImageArrayContent = JSON.parse(localStorage.getItem('Image_Array'));
        index = 0;
        var video = 'video' + (sec + 1) + '_' + (index + 1);
        document.getElementById(video).style.display = 'block';
        $(document).ready(function () {
            document.getElementById('question').innerHTML =
                count +
                    '. ' +
                    data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                        .Questions[index].QuestionTextList[0];
            if (sec != 0) {
                var key = '';
                $(document).keydown(function (e) {
                    key = e.key;
                });
                Event_log('NEXT_BUTTON_CLICKED', data, sec, index, key);
            }
            if (id > 0 && sec != 0) {
                $('#previous').removeAttr('disabled');
                document.getElementById('question').innerHTML +=
                    '<br/>' +
                        '    ' +
                        '<font color="maroon" size="4">' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[id] +
                        '</font>';
            }
        });
        $(function () {
            $('#dropdown').change(function () {
                Event_log('QUESTION_LANGUAGE_CHANGED', data, sec, index, key);
                if (id == 0) {
                    option = $('#dropdown option:selected').attr('id');
                    if (option == 'Hindi')
                        id = 1;
                    else if (option == 'English')
                        id = 0;
                    else if (option == 'Tamil')
                        id = 2;
                    else if (option == 'Kannada')
                        id = 3;
                    else if (option == 'Telugu')
                        id = 4;
                    else if (option == 'Malayalam')
                        id = 5;
                    else if (option == 'Gujarati')
                        id = 6;
                    else if (option == 'Marati')
                        id = 7;
                    else if (option == 'Bengali')
                        id = 8;
                    if (id == 0) {
                        document.getElementById('question').innerHTML =
                            count +
                                '. ' +
                                data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                                    .Questions[index].QuestionTextList[id];
                    }
                    else if (id != 0) {
                        document.getElementById('question').innerHTML +=
                            '<br/>' +
                                '    ' +
                                '<font color="maroon" size="4">' +
                                data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                                    .Questions[index].QuestionTextList[id] +
                                '</font>';
                    }
                }
                else if (id > 0) {
                    option = $('#dropdown option:selected').attr('id');
                    if (option == 'Hindi')
                        id = 1;
                    else if (option == 'English')
                        id = 0;
                    else if (option == 'Tamil')
                        id = 2;
                    else if (option == 'Kannada')
                        id = 3;
                    else if (option == 'Telugu')
                        id = 4;
                    else if (option == 'Malayalam')
                        id = 5;
                    else if (option == 'Gujarati')
                        id = 6;
                    else if (option == 'Marati')
                        id = 7;
                    else if (option == 'Bengali')
                        id = 8;
                    if (id == 0) {
                        document.getElementById('question').innerHTML =
                            count +
                                '. ' +
                                data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                                    .Questions[index].QuestionTextList[id];
                    }
                    else if (id != 0) {
                        document.getElementById('question').innerHTML =
                            count +
                                '. ' +
                                data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                                    .Questions[index].QuestionTextList[0] +
                                '<br/>' +
                                '     ' +
                                '<font color="maroon" size="4">' +
                                data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                                    .Questions[index].QuestionTextList[id] +
                                '</font>';
                    }
                }
            });
        });
        if (sec + 1 ==
            data.CandidateAssessmentData.PracticalAssessment.Sections.length &&
            index + 1 ==
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions
                    .length)
            $('#next').attr('disabled', 'disabled');
        var sections = 'sec' + (sec + 1) + '_' + (index + 1);
        if (document.getElementById(sections).className == 'btn btn-warning px-3')
            $('#checkbox').prop('checked', true);
        else
            $('#checkbox').prop('checked', false);
        if (parseInt(data.CandidateAssessmentData.CandidateAttemptCount) > 1) {
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('ASSESSMENT_CONTINUED', data, sec, index, key);
        }
        else if (parseInt(data.CandidateAssessmentData.CandidateAttemptCount) == 1) {
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('ASSESSMENT_CONTINUED', data, sec, index, key);
        }
        $(function () {
            $('#img').css('display', 'none');
            if (data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                .Questions[index].QuestionImageFileName != '') {
                var link = environment_1.environment.Question_Image_URL +
                    data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                        .Questions[index].QuestionImageFileName;
                $('#img').attr('src', link);
                $('#img').css('display', 'block');
            }
            $('#img').click(function () {
                $('#myModal').css('display', 'block');
                var src = $('#img').attr('src');
                $('#img01').attr('src', src);
            });
            var span = document.getElementsByClassName('close')[0];
            span.onclick = function () {
                $('#myModal').css('display', 'none');
            };
        });
        cam(this.data, sec, index);
    };
    PracticalAssessmentComponent.prototype.next = function () {
        var video = 'video' + (sec + 1) + '_' + (index + 1);
        document.getElementById(video).style.display = 'none';
        var data = this.data;
        index += 1;
        count += 1;
        if (index <
            data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions
                .length) {
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('NEXT_BUTTON_CLICKED', data, sec, index, key);
            if (id > 0) {
                document.getElementById('question').innerHTML =
                    count +
                        '. ' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[0] +
                        '<br/>' +
                        '      ' +
                        '<font color="maroon" size="4">' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[id] +
                        '</font>';
            }
            else if (id == 0) {
                document.getElementById('question').innerHTML =
                    count +
                        '. ' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[0];
            }
            if (sec + 1 ==
                data.CandidateAssessmentData.PracticalAssessment.Sections.length &&
                index + 1 ==
                    data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                        .Questions.length)
                $('#next').attr('disabled', 'disabled');
        }
        else {
            sec += 1;
            $('#previous').removeAttr('disabled');
            if (sec < data.CandidateAssessmentData.PracticalAssessment.Sections.length) {
                this.initial();
            }
        }
        $(function () {
            $('#dropdown').change(function () {
                var key = '';
                $(document).keydown(function (e) {
                    key = e.key;
                });
                Event_log('QUESTION_LANGUAGE_CHANGED', data, sec, index, key);
                option = $('#dropdown option:selected').attr('id');
                if (option == 'Hindi')
                    id = 1;
                else if (option == 'Tamil')
                    id = 2;
                else if (option == 'Kannada')
                    id = 3;
                else if (option == 'Telugu')
                    id = 4;
                else if (option == 'Malayalam')
                    id = 5;
                else if (option == 'Gujarati')
                    id = 6;
                else if (option == 'Marati')
                    id = 7;
                else if (option == 'Bengali')
                    id = 8;
            });
        });
        var sections = 'sec' + (sec + 1) + '_' + (index + 1);
        if (document.getElementById(sections).className == 'btn btn-warning px-3')
            $('#checkbox').prop('checked', true);
        else
            $('#checkbox').prop('checked', false);
        $('#img').css('display', 'none');
        $(function () {
            if (data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                .Questions[index].QuestionImageFileName != '') {
                var link = environment_1.environment.Question_Image_URL +
                    data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                        .Questions[index].QuestionImageFileName;
                $('#img').attr('src', link);
                $('#img').css('display', 'block');
            }
            $('#img').click(function () {
                $('#myModal').css('display', 'block');
                var src = $('#img').attr('src');
                $('#img01').attr('src', src);
            });
            var span = document.getElementsByClassName('close')[0];
            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                $('#myModal').css('display', 'none');
            };
        });
        cam(this.data, sec, index);
    };
    PracticalAssessmentComponent.prototype.previous = function () {
        var video = 'video' + (sec + 1) + '_' + (index + 1);
        document.getElementById(video).style.display = 'none';
        video = 'video' + sec + '_' + (index + 1);
        document.getElementById(video).style.display = 'block';
        $('#next').removeAttr('disabled');
        var data = this.data;
        if (index !== 0) {
            index -= 1;
            count -= 1;
        }
        else if (index == 0) {
            if (sec != 0)
                sec -= 1;
            if (sec >= 0) {
                index =
                    data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                        .Questions.length - 1;
                count -= 1;
            }
        }
        if (index >= 0) {
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('PREVIOUS_BUTTON_CLICKED', data, sec, index, key);
            if (id > 0) {
                document.getElementById('question').innerHTML =
                    count +
                        '. ' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[0] +
                        '<br/>' +
                        '     ' +
                        '<font color="maroon" size="4">' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[id] +
                        '</font>';
            }
            else if (id == 0) {
                document.getElementById('question').innerHTML =
                    count +
                        '. ' +
                        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                            .Questions[index].QuestionTextList[0];
            }
        }
        $(function () {
            $('#dropdown').change(function () {
                var key = '';
                $(document).keydown(function (e) {
                    key = e.key;
                });
                Event_log('QUESTION_LANGUAGE_CHANGED', data, sec, index, key);
                option = $('#dropdown option:selected').attr('id');
                if (option == 'Hindi')
                    id = 1;
                else if (option == 'Tamil')
                    id = 2;
                else if (option == 'Kannada')
                    id = 3;
                else if (option == 'Telugu')
                    id = 4;
                else if (option == 'Malayalam')
                    id = 5;
                else if (option == 'Gujarati')
                    id = 6;
                else if (option == 'Marati')
                    id = 7;
                else if (option == 'Bengali')
                    id = 8;
            });
        });
        if (sec == 0 && index == 0) {
            $('#previous').attr('disabled', 'disabled');
        }
        var sections = 'sec' + (sec + 1) + '_' + (index + 1);
        if (document.getElementById(sections).className == 'btn btn-warning px-3')
            $('#checkbox').prop('checked', true);
        else
            $('#checkbox').prop('checked', false);
        $('#img').css('display', 'none');
        if (data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[index].QuestionImageFileName != '') {
            var link = environment_1.environment.Question_Image_URL +
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                    .Questions[index].QuestionImageFileName;
            $('#img').attr('src', link);
            $('#img').css('display', 'block');
        }
        $('#img').click(function () {
            $('#myModal').css('display', 'block');
            var src = $('#img').attr('src');
            $('#img01').attr('src', src);
        });
        var span = document.getElementsByClassName('close')[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            $('#myModal').css('display', 'none');
        };
        cam(this.data, sec, index);
    };
    PracticalAssessmentComponent.prototype.clicked = function (section, ind, question) {
        $(function () {
            document.getElementById('video1_1').style.display = 'none';
            document.getElementById('video2_1').style.display = 'none';
            document.getElementById('video3_1').style.display = 'none';
            //var video = 'video' + section + '_' + ind;
            //document.getElementById(video).style.display = 'block';
            var sections = 'sec' + section + '_' + ind;
            if (document.getElementById(sections).className == 'btn btn-warning px-3')
                $('#checkbox').prop('checked', true);
            else
                $('#checkbox').prop('checked', false);
            $('#next').removeAttr('disabled');
            $('#previous').removeAttr('disabled');
            if (section == '1' && ind == '1')
                $('#previous').attr('disabled', 'disabled');
            if (section == '3' && ind == '1')
                $('#next').attr('disabled', 'disabled');
            count = parseInt(question);
            if (ind == '1')
                index = 0;
            else if (ind == '2')
                index = 1;
            if (section == '1')
                sec = 0;
            else if (section == '2')
                sec = 1;
            else if (section == '3')
                sec = 2;
            if (id == 0) {
                document.getElementById('question').innerHTML =
                    question +
                        '. ' +
                        varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
                            .Sections[sec].Questions[index].QuestionTextList[0];
            }
            else if (id != 0) {
                document.getElementById('question').innerHTML =
                    question +
                        '. ' +
                        varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
                            .Sections[sec].Questions[index].QuestionTextList[0] +
                        '<br/>' +
                        '      ' +
                        '<font color="maroon" size="4">' +
                        varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
                            .Sections[sec].Questions[index].QuestionTextList[id] +
                        '</font>';
            }
            var key = '';
            $(document).keydown(function (e) {
                key = e.key;
            });
            Event_log('QUESTION_LINK_CLICKED', varCandidateAssessmentData, sec, index, key);
            $('#img').css('display', 'none');
            if (varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
                .Sections[sec].Questions[index].QuestionImageFileName != '') {
                var link = environment_1.environment.Question_Image_URL +
                    varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
                        .Sections[sec].Questions[index].QuestionImageFileName;
                $('#img').attr('src', link);
                $('#img').css('display', 'block');
            }
            $('#img').click(function () {
                $('#myModal').css('display', 'block');
                var src = $('#img').attr('src');
                $('#img01').attr('src', src);
            });
            var span = document.getElementsByClassName('close')[0];
            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                $('#myModal').css('display', 'none');
            };
            cam(varCandidateAssessmentData, parseInt(section) - 1, parseInt(ind) - 1);
        });
    };
    /*marked() {
      var data = JSON.parse(localStorage.getItem('Response_data'));
      var section = 'sec' + (sec + 1) + '_' + (index + 1);
      if ($('#checkbox').is(':checked')) {
        marked_review += 1;
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log(
          'QUESTION_MARKED_FOR_REVIEW',
          data,
          sec,
          index,
          key
        );
        document.getElementById(section).className = 'btn btn-warning px-3';
      } else {
        document.getElementById(section).classList.remove('btn-warning');
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log(
          'QUESTION_UNMARKED_FOR_REVIEW',
          data,
          sec,
          index,
          key
        );
        if (
          parseInt(
            data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
              .Questions[index].CandidateActualResponseOption
          ) != -1
        ) {
          document.getElementById(section).className = 'btn btn-success px-3';
          marked_review -= 1;
        } else {
          document.getElementById(section).className = 'btn btn-danger px-3';
          marked_review -= 1;
        }
      }
    }*/
    PracticalAssessmentComponent.prototype.timeup = function (event) {
        if (event.action == 'done') {
            timer = true;
            $('#submit_reponse_btn').click();
        }
    };
    PracticalAssessmentComponent.prototype.submit = function () {
        if (timer)
            $('#no').attr('disabled', 'disabled');
        attempted_count = 0;
        var total_question = 0;
        var data = this.data;
        $.each(data.CandidateAssessmentData.PracticalAssessment.Sections, function (index, value) {
            total_question +=
                data.CandidateAssessmentData.PracticalAssessment.Sections[index]
                    .Questions.length;
            $.each(data.CandidateAssessmentData.PracticalAssessment.Sections[index]
                .Questions, function (ind, val) {
                var section = 'sec' + (index + 1) + '_' + (ind + 1);
                if (document.getElementById(section).className == 'btn btn-success px-3') {
                    attempted_count += 1;
                }
            });
        });
        $(document).ready(function () {
            document.getElementById('1').innerHTML =
                '<h2>Total questions : ' +
                    total_question +
                    ' questions <br></h2>' +
                    '<h2>Attempted questions : ' +
                    attempted_count +
                    ' questions <br></h2>' +
                    '<h2>Unattempted questions : ' +
                    (total_question - attempted_count) +
                    ' questions <br></h2>';
        });
    };
    PracticalAssessmentComponent.prototype.yes = function () {
        var data = JSON.parse(localStorage.getItem('Response_data'));
        if (data.CandidateAssessmentData.PracticalAssessment
            .AssessmentFinishDateTime == '')
            data.CandidateAssessmentData.PracticalAssessment.AssessmentFinishDateTime = moment().format('DD-MMM-YYYY h:mm:ss a');
        var key = '';
        $(document).keydown(function (e) {
            key = e.key;
        });
        Event_log('ASSESSMENT_FINISHED', data, sec, index, key);
        data.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 2;
        localStorage.setItem('Response_data', JSON.stringify(data));
        this.route.navigate(['end-image-capture']);
    };
    PracticalAssessmentComponent.prototype.Uploadfiles = function (ImageArrayContent) {
        var varForm = document.getElementById('frmImages');
        $('#frmImages').append('<input name="image_data" value="' + ImageArrayContent.Image_Data + '">');
        $('#frmImages').append('<input name="image_file_name" value="' +
            ImageArrayContent.FileName +
            '">');
        $.ajax({
            url: environment_1.environment.Upload_files_URL,
            type: 'POST',
            data: new FormData(varForm),
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                //var varResponseData = JSON.parse(response);
                console.log(response);
                var key = '';
                $(document).keydown(function (e) {
                    key = e.key;
                });
                Event_log('ASSESSMENT_DATA_UPLOADED', JSON.parse(localStorage.getItem('Response_data')), sec, index, key);
            },
            error: function (e) {
                alert('Error');
                var key = '';
                $(document).keydown(function (e) {
                    key = e.key;
                });
                Event_log('ASSESSMENT_DATA_UPLOAD_FAILED', JSON.parse(localStorage.getItem('Response_data')), sec, index, key);
            }
        });
    };
    PracticalAssessmentComponent.prototype.ngOnDestroy = function () {
        if (id1) {
            clearInterval(id1);
        }
        if (id2) {
            clearInterval(id2);
        }
        if (id3) {
            clearInterval(id3);
        }
        localstream.getTracks()[0].stop();
        document.removeEventListener('fullscreenchange', this.full_screen);
        document.removeEventListener('visibilitychange', this.visibility);
        document
            .getElementById('video1_1')
            .parentNode.removeChild(document.getElementById('video1_1'));
        document
            .getElementById('video2_1')
            .parentNode.removeChild(document.getElementById('video2_1'));
        document
            .getElementById('video3_1')
            .parentNode.removeChild(document.getElementById('video3_1'));
    };
    PracticalAssessmentComponent = __decorate([
        core_1.Component({
            selector: 'app-practical-assessment',
            templateUrl: './practical-assessment.component.html',
            styleUrls: ['./practical-assessment.component.css']
        })
    ], PracticalAssessmentComponent);
    return PracticalAssessmentComponent;
}());
exports.PracticalAssessmentComponent = PracticalAssessmentComponent;
function Event_log(events, data, sec, index, key) {
    var lat = localStorage.getItem('lat');
    var long = localStorage.getItem('long');
    var Assessment_event = {
        DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
        SubTypeId: 0,
        SectionId: parseInt(data.CandidateAssessmentData.PracticalAssessment.Sections[sec].SectionId),
        SectionIndex: sec,
        QuestionId: parseInt(data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[index].QuestionId),
        QuestionIndex: index,
        ActualResponse: parseInt(data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[index].CandidateActualResponseOption),
        KeyboardKey: key,
        Latitude: lat,
        Longitude: long
    };
    switch (events) {
        case 'ASSESSMENT_STARTED':
            Assessment_event.SubTypeId = 1;
            break;
        case 'ASSESSMENT_CONTINUED':
            Assessment_event.SubTypeId = 2;
            break;
        case 'ASSESSMENT_FINISHED':
            Assessment_event.SubTypeId = 3;
            break;
        case 'ASSESSMENT_DATA_UPLOAD_FAILED':
            Assessment_event.SubTypeId = 4;
            break;
        case 'ASSESSMENT_DATA_UPLOADED':
            Assessment_event.SubTypeId = 5;
            break;
        case 'ASSESSMENT_SUBMITTED':
            Assessment_event.SubTypeId = 7;
            break;
        case 'QUESTION_LINK_CLICKED':
            Assessment_event.SubTypeId = 12;
            break;
        case 'PREVIOUS_BUTTON_CLICKED':
            Assessment_event.SubTypeId = 13;
            break;
        case 'NEXT_BUTTON_CLICKED':
            Assessment_event.SubTypeId = 14;
            break;
        case 'QUESTION_LANGUAGE_CHANGED':
            Assessment_event.SubTypeId = 15;
            break;
        case 'QUESTION_MARKED_FOR_REVIEW':
            Assessment_event.SubTypeId = 17;
            break;
        case 'QUESTION_UNMARKED_FOR_REVIEW':
            Assessment_event.SubTypeId = 18;
            break;
        case 'OPTION_SELECTED':
            Assessment_event.SubTypeId = 21;
            break;
        case 'KEYBOARD_KEY_PRESSED':
            Assessment_event.SubTypeId = 23;
            break;
        case 'ASSESSMENT_VIOLATION':
            Assessment_event.SubTypeId = 25;
            break;
    }
    data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push(Assessment_event);
    var file = localStorage.getItem('req_id') +
        '_' +
        localStorage.getItem('cand_id') +
        '_' +
        'data';
    if (typeof data == 'string')
        localStorage.setItem(file, data);
    else
        localStorage.setItem(file, JSON.stringify(data));
    localStorage.setItem('Response_data', data);
}
