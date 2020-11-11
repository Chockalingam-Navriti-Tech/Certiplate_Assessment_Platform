import { async } from '@angular/core/testing';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

declare var window: any;
var total_count = 0,
  count = 0;
var response_object;
@Component({
  selector: 'app-submit-response',
  templateUrl: './submit-response.component.html',
  styleUrls: ['./submit-response.component.css'],
})
export class SubmitResponseComponent implements OnInit {
  constructor(private route: Router) {}
  Req: string;
  Id: string;

  ngOnInit(): void {
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');
    response_object = JSON.parse(localStorage.getItem('Response_data'));
  }

  async onInitFs(fs: any) {
    if (localStorage.getItem('assessment') == 'theory') {
      total_count = 0;
      if (
        response_object.CandidateAssessmentData.TheoryAssessment
          .ScreenshotImages.length == 0 &&
        response_object.CandidateAssessmentData.TheoryAssessment.SnapshotImages
          .length == 0
      ) {
        $('#loads').css('display', 'none');
        $('#progresses').css('display', 'none');
        $('#dones').css('display', 'block');
      } else {
        $.each(
          response_object.CandidateAssessmentData.TheoryAssessment
            .ScreenshotImages,
          function (index, value) {
            total_count += 1;
            ReadFileFromFileSystem(fs, value.Filename);
          }
        );
        $.each(
          response_object.CandidateAssessmentData.TheoryAssessment
            .SnapshotImages,
          function (index, value) {
            total_count += 1;
            ReadFileFromFileSystem(fs, value.Filename);
          }
        );
      }
    } else if (localStorage.getItem('assessment') == 'practical') {
      total_count = 0;
      var flag = 0;
      if (
        response_object.CandidateAssessmentData.PracticalAssessment
          .ScreenshotImages.length == 0 &&
        response_object.CandidateAssessmentData.PracticalAssessment
          .SnapshotImages.length == 0
      ) {
        flag = 1;
      } else {
        $.each(
          response_object.CandidateAssessmentData.PracticalAssessment
            .ScreenshotImages,
          function (index, value) {
            total_count += 1;
            ReadFileFromFileSystem(fs, value.Filename);
          }
        );
        $.each(
          response_object.CandidateAssessmentData.PracticalAssessment
            .SnapshotImages,
          function (index, value) {
            total_count += 1;
            ReadFileFromFileSystem(fs, value.Filename);
          }
        );
      }

      $.each(
        response_object.CandidateAssessmentData.PracticalAssessment.Sections,
        function (index, value1) {
          $.each(
            response_object.CandidateAssessmentData.PracticalAssessment
              .Sections[index].Questions,
            function (ind, value2) {
              if (value2.CandidateResponseVideoFileName != '') {
                total_count += 1;
                ReadVideoFromFileSystem(
                  fs,
                  value2.CandidateResponseVideoFileName
                );
              }
            }
          );
        }
      );
      if (flag == 1 && total_count == 0) {
        $('#loads').css('display', 'none');
        $('#progresses').css('display', 'none');
        $('#dones').css('display', 'block');
      }
    } else if (localStorage.getItem('assessment') == 'viva') {
      total_count = 0;
      if (
        response_object.CandidateAssessmentData.VivaMcqAssessment
          .ScreenshotImages.length == 0 &&
        response_object.CandidateAssessmentData.VivaMcqAssessment.SnapshotImages
          .length == 0
      ) {
        $('#loads').css('display', 'none');
        $('#progresses').css('display', 'none');
        $('#dones').css('display', 'block');
      } else {
        $.each(
          response_object.CandidateAssessmentData.VivaMcqAssessment
            .ScreenshotImages,
          function (index, value) {
            total_count += 1;
            ReadFileFromFileSystem(fs, value.Filename);
          }
        );
        $.each(
          response_object.CandidateAssessmentData.VivaMcqAssessment
            .SnapshotImages,
          function (index, value) {
            total_count += 1;
            ReadFileFromFileSystem(fs, value.Filename);
          }
        );
      }
    }
  }

  clicked_file_upload() {
    $('#div').css('display', 'none');
    $('#submits').css('display', 'none');
    $('#loads').css('display', 'block');
    $('#progresses').css('display', 'block');
    window.requestFileSystem =
      window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(
      window.TEMPORARY,
      100 * 1024 * 1024,
      this.onInitFs,
      errorHandler
    );
  }

  clicked() {
    $('#div').css('display', 'none');
    $('#submit').css('display', 'none');
    $('#load').css('display', 'block');
    $('#progress').css('display', 'block');
    var response_string = JSON.stringify(
      response_object.CandidateAssessmentData
    );
    var date = moment().format('YYYYMMDDhhmmss');
    var filename =
      this.Req + '_' + this.Id + '_' + date + '_response_data.json';
    /*$('#frmImages').append(
      '<input name="response_data" value="' + response + '">'
    );*/

    //var varForm = <HTMLFormElement>document.getElementById('frmImages');

    var varFormdata = new FormData();
    varFormdata.append('response_data', response_string);
    varFormdata.append('response_file_name', filename);
    var data_updated = this.Req + '_' + this.Id + '_data';
    let lat = localStorage.getItem('lat') as string;
    let long = localStorage.getItem('long') as string;
    var response_str = JSON.parse(localStorage.getItem('Response_data'));
    $.ajax({
      url: environment.Upload_files_URL,
      type: 'POST',
      data: varFormdata,
      contentType: false,
      cache: false,
      processData: false,
      success: function (response) {
        console.log(response);
        $.ajax({
          url: environment.Submit_Responsedata_URL,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey: environment.api_key,
            CandidateResponseDataFile: filename,
            DataCompressed: false,
          },
          success: function (reply) {
            $('#div').css('display', 'none');
            $('#warning').css('display', 'none');
            console.log(reply);
            var reply = JSON.parse(JSON.stringify(reply));
            if (reply.SubmitCandidateAssessmentData.Message == 'Success') {
              if (localStorage.getItem('assessment') == 'theory') {
                if (
                  parseInt(
                    reply.SubmitCandidateAssessmentData.TheoryResponse
                      .TestSubmissionId
                  ) > 0
                ) {
                  $('#load').css('display', 'none');
                  $('#progress').css('display', 'none');
                  $('#done').css('display', 'block');
                  response_str.CandidateAssessmentData.TheoryAssessment.AssessmentStatus = 4;
                  response_str.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push(
                    {
                      DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                      SubTypeId: 7,
                      Latitude: lat as string,
                      Longitude: long as string,
                    }
                  );
                  localStorage.setItem(
                    data_updated,
                    JSON.stringify(response_str)
                  );
                  if (
                    response_str.CandidateAssessmentData.PracticalAssessment
                  ) {
                    if (
                      parseInt(
                        response_str.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus
                      ) != 4
                    ) {
                      document.getElementById('btn').style.display = 'block';
                    } else if (
                      parseInt(
                        response_str.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus
                      ) == 4
                    ) {
                      document.getElementById('success').style.display =
                        'block';
                    }
                  } else if (
                    response_str.CandidateAssessmentData.VivaMcqAssessment
                  ) {
                    if (
                      parseInt(
                        response_str.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus
                      ) != 4
                    ) {
                      document.getElementById('btn').style.display = 'block';
                    } else if (
                      parseInt(
                        response_str.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus
                      ) == 4
                    ) {
                      document.getElementById('success').style.display =
                        'block';
                    }
                  }
                }
              } else if (localStorage.getItem('assessment') == 'practical') {
                if (
                  parseInt(
                    reply.SubmitCandidateAssessmentData.PracticalResponse
                      .TestSubmissionId
                  ) > 0
                ) {
                  $('#load').css('display', 'none');
                  $('#progress').css('display', 'none');
                  $('#done').css('display', 'block');
                  response_str.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 4;
                  response_str.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push(
                    {
                      DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                      SubTypeId: 7,
                      Latitude: lat as string,
                      Longitude: long as string,
                    }
                  );
                  localStorage.setItem(
                    data_updated,
                    JSON.stringify(response_str)
                  );
                  if (
                    parseInt(
                      response_str.CandidateAssessmentData.TheoryAssessment
                        .AssessmentStatus
                    ) != 4
                  ) {
                    document.getElementById('btn').style.display = 'block';
                  } else if (
                    parseInt(
                      response_str.CandidateAssessmentData.TheoryAssessment
                        .AssessmentStatus
                    ) == 4
                  ) {
                    document.getElementById('success').style.display = 'block';
                  }
                }
              } else if (localStorage.getItem('assessment') == 'viva') {
                if (
                  parseInt(
                    reply.SubmitCandidateAssessmentData.VivaMcqResponse
                      .TestSubmissionId
                  ) > 0
                ) {
                  $('#load').css('display', 'none');
                  $('#progress').css('display', 'none');
                  $('#done').css('display', 'block');
                  response_str.CandidateAssessmentData.VivaMcqAssessment.AssessmentStatus = 4;
                  response_str.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push(
                    {
                      DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                      SubTypeId: 7,
                      Latitude: lat,
                      Longitude: long,
                    }
                  );
                  localStorage.setItem(
                    data_updated,
                    JSON.stringify(response_str)
                  );
                  if (
                    parseInt(
                      response_str.CandidateAssessmentData.TheoryAssessment
                        .AssessmentStatus
                    ) != 4
                  ) {
                    document.getElementById('btn').style.display = 'block';
                  } else if (
                    parseInt(
                      response_str.CandidateAssessmentData.TheoryAssessment
                        .AssessmentStatus
                    ) == 4
                  ) {
                    document.getElementById('success').style.display = 'block';
                  }
                }
              }
            }
            localStorage.setItem('Response_data', JSON.stringify(response_str));
          },
          error: function (e) {
            $('#load').css('display', 'none');
            $('#progress').css('display', 'none');
            $('#submit').css('display', 'block');
            $('#div').css('display', 'block');
            document.getElementById('warning').innerHTML =
              'Response Data not uploaded. Please try again!';
            if (localStorage.getItem('assessment') == 'theory') {
              response_str.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push(
                {
                  DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                  SubTypeId: 6,
                  Latitude: lat,
                  Longitude: long,
                }
              );
            } else if (localStorage.getItem('assessment') == 'practical') {
              response_str.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push(
                {
                  DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                  SubTypeId: 6,
                  Latitude: lat,
                  Longitude: long,
                }
              );
            } else if (localStorage.getItem('assessment') == 'viva') {
              response_str.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push(
                {
                  DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
                  SubTypeId: 6,
                  Latitude: lat,
                  Longitude: long,
                }
              );
            }
            localStorage.setItem(data_updated, JSON.stringify(response_str));
            localStorage.setItem('Response_data', JSON.stringify(response_str));
          },
        });
      },
      error: function (e) {
        $('#load').css('display', 'none');
        $('#progress').css('display', 'none');
        $('#submit').css('display', 'block');
        $('#div').css('display', 'block');
        document.getElementById('warning').innerHTML =
          'Response Data not uploaded. Please try again!';
        if (localStorage.getItem('assessment') == 'theory') {
          response_str.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push(
            {
              DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
              SubTypeId: 6,
              Latitude: lat,
              Longitude: long,
            }
          );
        } else if (localStorage.getItem('assessment') == 'practical') {
          response_str.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push(
            {
              DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
              SubTypeId: 6,
              Latitude: lat,
              Longitude: long,
            }
          );
        } else if (localStorage.getItem('assessment') == 'viva') {
          response_str.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push(
            {
              DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
              SubTypeId: 6,
              Latitude: lat,
              Longitude: long,
            }
          );
        }
        localStorage.setItem(data_updated, JSON.stringify(response_str));
        localStorage.setItem('Response_data', JSON.stringify(response_str));
      },
    });
  }
  assessment() {
    this.route.navigate(['assessment-details']);
  }
  finished() {
    this.route.navigate(['login']);
  }
}

function ReadFileFromFileSystem(varFs: any, fileName: any) {
  varFs.root.getFile(
    fileName,
    {},
    function (fileEntry: any) {
      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function (file: any) {
        var reader = new FileReader();

        reader.onloadend = function (e: any) {
          var varFormData = new FormData();
          varFormData.append('image_file_name', fileName);
          varFormData.append('image_data', this.result as string);
          const res = Uploadfiles(varFormData);
          console.log(res);
        };
        reader.readAsText(file);
      }, errorHandler);
    },
    errorHandler
  );
}

function ReadVideoFromFileSystem(varFs: any, fileName: any) {
  varFs.root.getFile(
    fileName,
    {},
    function (fileEntry: any) {
      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function (file: any) {
        var reader = new FileReader();

        reader.onloadend = function (e: any) {
          var varFormData = new FormData();
          varFormData.append('video_file_name', fileName);
          varFormData.append('video_data', this.result as string);
          const res = Uploadfiles(varFormData);
          console.log(res);
        };
        reader.readAsText(file);
      }, errorHandler);
    },
    errorHandler
  );
}

function Uploadfiles(varFormData: any) {
  var res;
  $.ajax({
    url: environment.Upload_files_URL,
    type: 'POST',
    data: varFormData,
    contentType: false,
    cache: false,
    processData: false,
    async: false,
    success: function (response) {
      res = response;
      count += 1;
      if (count == total_count) {
        Event_log('ASSESSMENT_DATA_UPLOADED', response_object);
        $('#loads').css('display', 'none');
        $('#progresses').css('display', 'none');
        $('#dones').css('display', 'block');
      }
    },
    error: function (e) {
      Event_log('ASSESSMENT_DATA_UPLOAD_FAILED', response_object);
      alert('Error');
    },
  });
  return res;
}

function errorHandler(err: any) {
  console.log(err);
}

function Event_log(events: string, data: any) {
  let lat = localStorage.getItem('lat');
  let long = localStorage.getItem('long');
  if (localStorage.getItem('assessment') == 'theory') {
    var Assessment_event = {
      DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
      SubTypeId: 0,
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
        Assessment_event.Description =
          'Candidate attempted to exit full screen';
        break;
      case 'TAB_SWITCH':
        Assessment_event.SubTypeId = 25;
        Assessment_event.Description = 'Candidate attempted to switch tabs';
        break;
    }
    data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push(
      Assessment_event
    );
    var file =
      localStorage.getItem('req_id') +
      '_' +
      localStorage.getItem('cand_id') +
      '_' +
      'data';
    if (typeof data == 'string')
      localStorage.setItem(file, JSON.stringify(data));
    else localStorage.setItem(file, JSON.stringify(data));
  } else if (localStorage.getItem('assessment') == 'practical') {
    var Assessment_event = {
      DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
      SubTypeId: 0,
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
        Assessment_event.Description =
          'Candidate attempted to exit full screen';
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
    if (typeof data == 'string')
      localStorage.setItem(file, JSON.stringify(data));
    else localStorage.setItem(file, JSON.stringify(data));
  } else if (localStorage.getItem('assessment') == 'viva') {
    var Assessment_event = {
      DateTime: moment().format('DD-MMM-YYYY h:mm:ss a'),
      SubTypeId: 0,
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
        Assessment_event.Description =
          'Candidate attempted to exit full screen';
        break;
      case 'TAB_SWITCH':
        Assessment_event.SubTypeId = 25;
        Assessment_event.Description = 'Candidate attempted to switch tabs';
        break;
    }
    data.CandidateAssessmentData.VivaMcqAssessment.AssessmentEvents.push(
      Assessment_event
    );
    var file =
      localStorage.getItem('req_id') +
      '_' +
      localStorage.getItem('cand_id') +
      '_' +
      'data';
    if (typeof data == 'string')
      localStorage.setItem(file, JSON.stringify(data));
    else localStorage.setItem(file, JSON.stringify(data));
  }
}
