import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import * as videojs from 'video.js';
var option;
var id = 0;
var count: number;
var localstream: any;
var count_cam: number = 0;
var index: number;
var sec: number;
var quest;
var fullscreen = 0;
var tab_switch_count = 0;
var exit_full_screen = 0;
var attempted_count: any;
var marked_review = 0;
let timer = false;
var id1, id2, id3, id4;
var varCandidateAssessmentData;

declare var cam: any;
@Component({
  selector: 'app-practical-assessment',
  templateUrl: './practical-assessment.component.html',
  styleUrls: ['./practical-assessment.component.css'],
})
export class PracticalAssessmentComponent implements OnInit {
  Req: any;
  Id: any;
  data: any;
  record_state: any;

  LeftTime: any = JSON.parse(
    localStorage.getItem(
      localStorage.getItem('req_id') +
        '_' +
        localStorage.getItem('cand_id') +
        '_' +
        'data'
    )
  ).CandidateAssessmentData.PracticalAssessment.RemainingDurationSeconds;
  time_array: any = [];

  constructor(private route: Router) {
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');
    this.data = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    var left = this.LeftTime;
    while (left >= 2) {
      this.time_array.push(left - 1);
      left -= 1;
    }
  }
  constraints = {
    video: {
      facingMode: 'user',
      width: 1280,
      height: 720,
    },
    audio: false,
  };
  private full_screen;
  private visibility;

  ngOnInit(): void {
    localStorage.setItem('Video_upload_url', environment.Upload_files_URL);
    varCandidateAssessmentData = this.data;

    $(function () {
      if (varCandidateAssessmentData.CandidateAssessmentData.Languages[1]) {
        document.getElementById(
          varCandidateAssessmentData.CandidateAssessmentData.Languages[1]
            .LanguageName
        ).style.display = 'block';
      }
    });

    var id = $('#card').attr('id');
    let nos = 1;
    var i_length =
      varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
        .Sections.length;

    for (let i = 0; i < i_length; i++) {
      $('#card').append(
        '<div class="row justify-content-center">' +
          '<p class="card-text">Section-' +
          (i + 1) +
          '</p><br /></div>' +
          '<div class="row justify-content-center">'
      );
      var j_length =
        varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
          .Sections[i].Questions.length;
      for (let j = 0; j < j_length; j++) {
        var ids = 'sec' + (i + 1) + '_' + (j + 1);
        var vid_id = 'video' + (i + 1) + '_' + (j + 1);
        $('#card').append(
          '<button id="' +
            ids +
            '" type= "button" class="btn btn-danger px-3" value="' +
            nos +
            '" >' +
            nos +
            '</button>'
        );
        $('#vid').append(
          '<video id="' +
            vid_id +
            '" playsinline class="video-js vjs-default-skin" style="display: none"></video>'
        );
        nos += 1;
      }
      $('#card').append('</div>');
    }

    let clicked = this.clicked;

    $(function () {
      $('button').click(function () {
        if (this.id.startsWith('sec')) {
          let section = this.id.split('_');
          clicked(
            section[0].charAt(section[0].length - 1),
            section[1],
            this.textContent as string
          );
        }
      });
    });
    var VideoContent = {
      VideoArray: [],
    };
    document.addEventListener(
      'contextmenu',
      (id4 = (event:any) => event.preventDefault())
    );
    $('body').on('cut copy paste', function (e) {
      e.preventDefault();
    });

    let datas: any = this.data;
    $(function () {
      if (
        datas.CandidateAssessmentData.PracticalAssessment
          .AssessmentStartDateTime == ''
      )
        datas.CandidateAssessmentData.PracticalAssessment.AssessmentStartDateTime = moment().format(
          'DD-MMM-YYYY h:mm:ss a'
        );
      $.each(
        datas.CandidateAssessmentData.PracticalAssessment.Sections,
        function (index: number, value) {
          $.each(
            datas.CandidateAssessmentData.PracticalAssessment.Sections[index]
              .Questions,
            function (ind: number, values) {
              if (
                datas.CandidateAssessmentData.PracticalAssessment.Sections[
                  index
                ].Questions[ind].CandidateActualResponseOption != '-1'
              ) {
                var sections = 'sec' + (index + 1) + '_' + (ind + 1);
                document.getElementById(sections).className =
                  'btn btn-success px-3';
              }
            }
          );
        }
      );
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
    document.addEventListener(
      'visibilitychange',
      (this.visibility = function () {
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        html2canvas(document.body).then(function (canvas: any) {
          var ScreenshotImage = {
            Filename: '',
            TimeStamp: '',
            Latitude: '',
            Longitude: '',
          };
          ScreenshotImage.Filename =
            'REG' +
            varCandidateAssessmentData.CandidateAssessmentData.RegistrationId +
            '_PracticalViolation_' +
            moment().format('YYYYMMDDhhmmss') +
            '.jpeg';
          ScreenshotImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
          ScreenshotImage.Latitude = lat as string;
          ScreenshotImage.Longitude = long as string;
          ImageArrayObj = {
            FileName: '',
            Image_Data: '',
          };
          ImageArrayObj.FileName =
            'REG' +
            varCandidateAssessmentData.CandidateAssessmentData.RegistrationId +
            '_PracticalViolation_' +
            moment().format('YYYYMMDDhhmmss') +
            '.jpeg';
          ImageArrayObj.Image_Data = canvas.toDataURL('image/jpeg');
          //ImageArrayContent.ImageArray.push(ImageArrayObj);
          //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
          varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment.ScreenshotImages.push(
            ScreenshotImage
          );
          Uploadfiles(ImageArrayObj);
        });
        Event_log('TAB_SWITCH', datas, sec, index, key);
        if (document.hidden) {
          $('#popup').css({
            opacity: 1,
          });
          if (tab_switch_count == 3) {
            document.getElementById('message').innerHTML =
              '<h1>' +
              'Please make sure that you dont leave this page<br><br>You only have no chances left<br>' +
              '</h1>';
          } else if (tab_switch_count < 3) {
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
                opacity: 0,
              });
              $('.fullscreen-container').fadeOut(200);
              var docElm = document.documentElement;
              if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
              }
            } else if (tab_switch_count >= 3) {
              $('#popup').css({
                opacity: 1,
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
      })
    );
    document.addEventListener(
      'fullscreenchange',
      (this.full_screen = function () {
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log('EXIT_FULLSCREEN', datas, sec, index, key);
        if (fullscreen % 2 != 0) {
          html2canvas(document.body).then(function (canvas: any) {
            var ScreenshotImage = {
              Filename: '',
              TimeStamp: '',
              Latitude: '',
              Longitude: '',
            };
            ScreenshotImage.Filename =
              'REG' +
              varCandidateAssessmentData.CandidateAssessmentData
                .RegistrationId +
              '_PracticalViolation_' +
              moment().format('YYYYMMDDhhmmss') +
              '.jpeg';
            ScreenshotImage.TimeStamp = moment().format(
              'DD-MMM-YYYY h:mm:ss a'
            );
            ScreenshotImage.Latitude = lat as string;
            ScreenshotImage.Longitude = long as string;
            ImageArrayObj = {
              FileName: '',
              Image_Data: '',
            };
            ImageArrayObj.FileName =
              'REG' +
              varCandidateAssessmentData.CandidateAssessmentData
                .RegistrationId +
              '_PracticalViolation_' +
              moment().format('YYYYMMDDhhmmss') +
              '.jpeg';
            ImageArrayObj.Image_Data = canvas.toDataURL('image/jpeg');
            //ImageArrayContent.ImageArray.push(ImageArrayObj);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment.ScreenshotImages.push(
              ScreenshotImage
            );
            Uploadfiles(ImageArrayObj);
          });
          $('#popup').css({
            opacity: 1,
          });
          if (exit_full_screen == 3) {
            document.getElementById('message').innerHTML =
              '<h1>' +
              'You cannot leave Full Screen Mode<br><br>You have no attempts left<br>' +
              '</h1>';
          } else if (exit_full_screen < 3) {
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
                opacity: 0,
              });
              $('.fullscreen-container').fadeOut(200);
              var docElm = document.documentElement;
              $(document).ready(function () {
                if (docElm.requestFullscreen) {
                  docElm.requestFullscreen();
                }
              });
            } else if (exit_full_screen >= 3) {
              $('#popup').css({
                opacity: 1,
                display: 'block',
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
      })
    );

    this.data.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 1;
    var counting = 0;
    var ImageArrayObj;
    let lat = localStorage.getItem('lat');
    let long = localStorage.getItem('long');
    let Uploadfiles = this.Uploadfiles;
    let data = this.data;

    id3 = setInterval(() => {
      //console.log(document.getElementById('countdown').getAttribute('[config]'));
      localStorage.setItem(
        this.Req + '_' + this.Id + '_' + 'data',
        JSON.stringify(data)
      );
      localStorage.setItem('Response_data', JSON.stringify(data));
    }, 5000);

    id1 = setInterval(() => {
      html2canvas(document.body).then(function (canvas: any) {
        var ScreenshotImage = {
          Filename: '',
          TimeStamp: '',
          Latitude: '',
          Longitude: '',
        };
        ScreenshotImage.Filename =
          'REG' +
          data.CandidateAssessmentData.RegistrationId +
          '_PracticalScreenShot_{' +
          counting +
          '}.jpeg';
        ScreenshotImage.TimeStamp = moment().format('DD-MMM-YYYY h:mm:ss a');
        ScreenshotImage.Latitude = lat as string;
        ScreenshotImage.Longitude = long as string;
        ImageArrayObj = {
          FileName: '',
          Image_Data: '',
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
        data.CandidateAssessmentData.PracticalAssessment.ScreenshotImages.push(
          ScreenshotImage
        );
        counting += 1;
        Uploadfiles(ImageArrayObj);
      });
      localStorage.setItem('Response_data', JSON.stringify(data));
    }, 30000);

    var constraints = this.constraints;
    var countings = 0;
    $(function () {
      navigator.getUserMedia(
        constraints,
        function (stream) {
          var video = <HTMLVideoElement>document.getElementById('video');
          video.srcObject = stream;
          localstream = stream;
          id2 = setInterval(() => {
            var canvas_vid = <HTMLCanvasElement>(
              document.getElementById('canvas')
            );
            canvas_vid.width = video.videoWidth;
            canvas_vid.height = video.videoHeight;
            canvas_vid.getContext('2d').drawImage(video, 0, 0);
            var varcanvas = canvas_vid.toDataURL('image/jpeg');
            if (video.srcObject != null) {
              var SnapshotImage = {
                Filename: '',
                TimeStamp: '',
                Latitude: '',
                Longitude: '',
              };
              SnapshotImage.Filename =
                'REG' +
                data.CandidateAssessmentData.RegistrationId +
                '_PracticalSnapShot_{' +
                countings +
                '}.jpeg';
              SnapshotImage.TimeStamp = moment().format(
                'DD-MMM-YYYY hh:mm:ss a'
              );
              SnapshotImage.Latitude = lat as string;
              SnapshotImage.Longitude = long as string;
              ImageArrayObj = {
                FileName: '',
                Image_Data: '',
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
              data.CandidateAssessmentData.PracticalAssessment.SnapshotImages.push(
                SnapshotImage
              );
              countings += 1;
              Uploadfiles(ImageArrayObj);
            }
            localStorage.setItem('Response_data', JSON.stringify(data));
          }, 30000);
        },
        function (err) {
          alert('there was an error ' + err);
        }
      );
    });
    this.data = data;
    this.initial();
  }
  initial() {
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
        var key: string = '';
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
          if (option == 'Hindi') id = 1;
          else if (option == 'English') id = 0;
          else if (option == 'Tamil') id = 2;
          else if (option == 'Kannada') id = 3;
          else if (option == 'Telugu') id = 4;
          else if (option == 'Malayalam') id = 5;
          else if (option == 'Gujarati') id = 6;
          else if (option == 'Marati') id = 7;
          else if (option == 'Bengali') id = 8;
          if (id == 0) {
            document.getElementById('question').innerHTML =
              count +
              '. ' +
              data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id];
          } else if (id != 0) {
            document.getElementById('question').innerHTML +=
              '<br/>' +
              '    ' +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id] +
              '</font>';
          }
        } else if (id > 0) {
          option = $('#dropdown option:selected').attr('id');
          if (option == 'Hindi') id = 1;
          else if (option == 'English') id = 0;
          else if (option == 'Tamil') id = 2;
          else if (option == 'Kannada') id = 3;
          else if (option == 'Telugu') id = 4;
          else if (option == 'Malayalam') id = 5;
          else if (option == 'Gujarati') id = 6;
          else if (option == 'Marati') id = 7;
          else if (option == 'Bengali') id = 8;
          if (id == 0) {
            document.getElementById('question').innerHTML =
              count +
              '. ' +
              data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id];
          } else if (id != 0) {
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

    if (
      sec + 1 ==
        data.CandidateAssessmentData.PracticalAssessment.Sections.length &&
      index + 1 ==
        data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions
          .length
    )
      $('#next').attr('disabled', 'disabled');

    var sections = 'sec' + (sec + 1) + '_' + (index + 1);
    if (document.getElementById(sections).className == 'btn btn-warning px-3')
      $('#checkbox').prop('checked', true);
    else $('#checkbox').prop('checked', false);

    if (parseInt(data.CandidateAssessmentData.CandidateAttemptCount) > 1) {
      var key: string = '';
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log('ASSESSMENT_CONTINUED', data, sec, index, key);
    } else if (
      parseInt(data.CandidateAssessmentData.CandidateAttemptCount) == 1
    ) {
      var key: string = '';
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log('ASSESSMENT_CONTINUED', data, sec, index, key);
    }

    $(function () {
      $('#img').css('display', 'none');
      if (
        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
          .Questions[index].QuestionImageFileName != ''
      ) {
        var link: string =
          environment.Question_Image_URL +
          data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
            .Questions[index].QuestionImageFileName;

        $('#img').attr('src', link);
        $('#img').css('display', 'block');
      }
      $('#img').click(function () {
        $('#myModal').css('display', 'block');
        let src = $('#img').attr('src');
        $('#img01').attr('src', src);
      });
      var span = <HTMLSpanElement>document.getElementsByClassName('close')[0];

      span.onclick = function () {
        $('#myModal').css('display', 'none');
      };
    });
    cam(this.data, sec, index);
  }
  next() {
    var video = 'video' + (sec + 1) + '_' + (index + 1);
    document.getElementById(video).style.display = 'none';
    var data = this.data;
    index += 1;
    count += 1;
    if (
      index <
      data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions
        .length
    ) {
      var key: string = '';
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
      } else if (id == 0) {
        document.getElementById('question').innerHTML =
          count +
          '. ' +
          data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
            .Questions[index].QuestionTextList[0];
      }
      if (
        sec + 1 ==
          data.CandidateAssessmentData.PracticalAssessment.Sections.length &&
        index + 1 ==
          data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
            .Questions.length
      )
        $('#next').attr('disabled', 'disabled');
    } else {
      sec += 1;
      $('#previous').removeAttr('disabled');
      if (
        sec < data.CandidateAssessmentData.PracticalAssessment.Sections.length
      ) {
        this.initial();
      }
    }

    $(function () {
      $('#dropdown').change(function () {
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log('QUESTION_LANGUAGE_CHANGED', data, sec, index, key);
        option = $('#dropdown option:selected').attr('id');
        if (option == 'Hindi') id = 1;
        else if (option == 'Tamil') id = 2;
        else if (option == 'Kannada') id = 3;
        else if (option == 'Telugu') id = 4;
        else if (option == 'Malayalam') id = 5;
        else if (option == 'Gujarati') id = 6;
        else if (option == 'Marati') id = 7;
        else if (option == 'Bengali') id = 8;
      });
    });

    var sections = 'sec' + (sec + 1) + '_' + (index + 1);
    if (document.getElementById(sections).className == 'btn btn-warning px-3')
      $('#checkbox').prop('checked', true);
    else $('#checkbox').prop('checked', false);

    $('#img').css('display', 'none');
    $(function () {
      if (
        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
          .Questions[index].QuestionImageFileName != ''
      ) {
        var link: string =
          environment.Question_Image_URL +
          data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
            .Questions[index].QuestionImageFileName;

        $('#img').attr('src', link);
        $('#img').css('display', 'block');
      }
      $('#img').click(function () {
        $('#myModal').css('display', 'block');
        let src = $('#img').attr('src');
        $('#img01').attr('src', src);
      });
      var span = <HTMLSpanElement>document.getElementsByClassName('close')[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        $('#myModal').css('display', 'none');
      };
    });
    cam(this.data, sec, index);
  }
  previous() {
    var video = 'video' + (sec + 1) + '_' + (index + 1);
    document.getElementById(video).style.display = 'none';
    video = 'video' + sec + '_' + (index + 1);
    document.getElementById(video).style.display = 'block';
    $('#next').removeAttr('disabled');
    var data = this.data;
    if (index !== 0) {
      index -= 1;
      count -= 1;
    } else if (index == 0) {
      if (sec != 0) sec -= 1;
      if (sec >= 0) {
        index =
          data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
            .Questions.length - 1;
        count -= 1;
      }
    }
    if (index >= 0) {
      var key: string = '';
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
      } else if (id == 0) {
        document.getElementById('question').innerHTML =
          count +
          '. ' +
          data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
            .Questions[index].QuestionTextList[0];
      }
    }
    $(function () {
      $('#dropdown').change(function () {
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log('QUESTION_LANGUAGE_CHANGED', data, sec, index, key);
        option = $('#dropdown option:selected').attr('id');
        if (option == 'Hindi') id = 1;
        else if (option == 'Tamil') id = 2;
        else if (option == 'Kannada') id = 3;
        else if (option == 'Telugu') id = 4;
        else if (option == 'Malayalam') id = 5;
        else if (option == 'Gujarati') id = 6;
        else if (option == 'Marati') id = 7;
        else if (option == 'Bengali') id = 8;
      });
    });
    if (sec == 0 && index == 0) {
      $('#previous').attr('disabled', 'disabled');
    }
    var sections = 'sec' + (sec + 1) + '_' + (index + 1);
    if (document.getElementById(sections).className == 'btn btn-warning px-3')
      $('#checkbox').prop('checked', true);
    else $('#checkbox').prop('checked', false);

    $('#img').css('display', 'none');
    if (
      data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
        index
      ].QuestionImageFileName != ''
    ) {
      var link: string =
        environment.Question_Image_URL +
        data.CandidateAssessmentData.PracticalAssessment.Sections[sec]
          .Questions[index].QuestionImageFileName;

      $('#img').attr('src', link);
      $('#img').css('display', 'block');
    }
    $('#img').click(function () {
      $('#myModal').css('display', 'block');
      let src = $('#img').attr('src');
      $('#img01').attr('src', src);
    });
    var span = <HTMLSpanElement>document.getElementsByClassName('close')[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      $('#myModal').css('display', 'none');
    };

    cam(this.data, sec, index);
  }

  clicked(section: string, ind: string, question: string) {
    $(function () {
      document.getElementById('video1_1').style.display = 'none';
      document.getElementById('video2_1').style.display = 'none';
      document.getElementById('video3_1').style.display = 'none';
      //var video = 'video' + section + '_' + ind;
      //document.getElementById(video).style.display = 'block';
      var sections = 'sec' + section + '_' + ind;
      if (document.getElementById(sections).className == 'btn btn-warning px-3')
        $('#checkbox').prop('checked', true);
      else $('#checkbox').prop('checked', false);
      $('#next').removeAttr('disabled');
      $('#previous').removeAttr('disabled');
      if (section == '1' && ind == '1')
        $('#previous').attr('disabled', 'disabled');
      if (section == '3' && ind == '1') $('#next').attr('disabled', 'disabled');
      count = parseInt(question);
      if (ind == '1') index = 0;
      else if (ind == '2') index = 1;
      if (section == '1') sec = 0;
      else if (section == '2') sec = 1;
      else if (section == '3') sec = 2;
      if (id == 0) {
        document.getElementById('question').innerHTML =
          question +
          '. ' +
          varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
            .Sections[sec].Questions[index].QuestionTextList[0];
      } else if (id != 0) {
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
      var key: string = '';
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        'QUESTION_LINK_CLICKED',
        varCandidateAssessmentData,
        sec,
        index,
        key
      );

      $('#img').css('display', 'none');
      if (
        varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
          .Sections[sec].Questions[index].QuestionImageFileName != ''
      ) {
        var link: string =
          environment.Question_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.PracticalAssessment
            .Sections[sec].Questions[index].QuestionImageFileName;
        $('#img').attr('src', link);
        $('#img').css('display', 'block');
      }
      $('#img').click(function () {
        $('#myModal').css('display', 'block');
        let src = $('#img').attr('src');
        $('#img01').attr('src', src);
      });
      var span = <HTMLSpanElement>document.getElementsByClassName('close')[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        $('#myModal').css('display', 'none');
      };

      cam(varCandidateAssessmentData, parseInt(section) - 1, parseInt(ind) - 1);
    });
  }

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

  timeup(event: any) {
    this.data.CandidateAssessmentData.PracticalAssessment.RemainingDurationSeconds =
      (event.left as number) / 1000;
    localStorage.setItem(
      localStorage.getItem('req_id') +
        '_' +
        localStorage.getItem('cand_id') +
        '_' +
        'data',
      JSON.stringify(this.data)
    );
    if (event.action == 'done') {
      timer = true;
      $('#submit_reponse_btn').click();
    }
  }

  submit() {
    if (timer) $('#no').attr('disabled', 'disabled');
    attempted_count = 0;
    let total_question = 0;
    var data = this.data;
    $.each(data.CandidateAssessmentData.PracticalAssessment.Sections, function (
      index: number,
      value
    ) {
      total_question +=
        data.CandidateAssessmentData.PracticalAssessment.Sections[index]
          .Questions.length;
      $.each(
        data.CandidateAssessmentData.PracticalAssessment.Sections[index]
          .Questions,
        function (ind: number, val) {
          var section = 'sec' + (index + 1) + '_' + (ind + 1);
          if (
            document.getElementById(section).className == 'btn btn-success px-3'
          ) {
            attempted_count += 1;
          }
        }
      );
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
  }

  yes() {
    var data = JSON.parse(localStorage.getItem('Response_data'));
    if (
      data.CandidateAssessmentData.PracticalAssessment
        .AssessmentFinishDateTime == ''
    )
      data.CandidateAssessmentData.PracticalAssessment.AssessmentFinishDateTime = moment().format(
        'DD-MMM-YYYY h:mm:ss a'
      );
    var key: string = '';
    $(document).keydown(function (e) {
      key = e.key;
    });
    Event_log('ASSESSMENT_FINISHED', data, sec, index, key);
    data.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 2;
    localStorage.setItem('Response_data', JSON.stringify(data));
    this.route.navigate(['end-image-capture']);
  }

  Uploadfiles(ImageArrayContent: any) {
    var varForm = <HTMLFormElement>document.getElementById('frmImages');
    $('#frmImages').append(
      '<input name="image_data" value="' + ImageArrayContent.Image_Data + '">'
    );
    $('#frmImages').append(
      '<input name="image_file_name" value="' +
        ImageArrayContent.FileName +
        '">'
    );
    let new_data = JSON.parse(localStorage.getItem('Response_data'));
    $.ajax({
      url: environment.Upload_files_URL,
      type: 'POST',
      data: new FormData(varForm),
      contentType: false,
      cache: false,
      processData: false,
      success: function (response) {
        //var varResponseData = JSON.parse(response);
        console.log(response);
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log('ASSESSMENT_DATA_UPLOADED', new_data, sec, index, key);
      },
      error: function (e) {
        alert('Error');
        var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log('ASSESSMENT_DATA_UPLOAD_FAILED', new_data, sec, index, key);
      },
    });
  }
  ngOnDestroy() {
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
    $('body').off();
    document.removeEventListener('contextmenu', id4);
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
  }
}

function Event_log(
  events: string,
  data: any,
  sec: number,
  index: number,
  key: string
) {
  let lat = localStorage.getItem('lat');
  let long = localStorage.getItem('long');
  var Assessment_event = {
    DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
    SubTypeId: 0,
    SectionId: parseInt(
      data.CandidateAssessmentData.PracticalAssessment.Sections[sec].SectionId
    ),
    SectionIndex: sec,
    QuestionId: parseInt(
      data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
        index
      ].QuestionId
    ),
    QuestionIndex: index,
    ActualResponse: parseInt(
      data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
        index
      ].CandidateActualResponseOption
    ),
    KeyboardKey: key,
    Description: '',
    Latitude: lat,
    Longitude: long,
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
    case 'EXIT_FULLSCREEN':
      Assessment_event.SubTypeId = 25;
      Assessment_event.Description = 'Candidate attempted to exit full screen';
      break;
    case 'TAB_SWITCH':
      Assessment_event.SubTypeId = 25;
      Assessment_event.Description = 'Candidate attempted to switch tabs';
      break;
  }
  data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push(
    Assessment_event
  );
  var file =
    localStorage.getItem('req_id') +
    '_' +
    localStorage.getItem('cand_id') +
    '_' +
    'data';
  if (typeof data == 'string') localStorage.setItem(file, JSON.stringify(data));
  else localStorage.setItem(file, JSON.stringify(data));
  localStorage.setItem('Response_data', JSON.stringify(data));
}
