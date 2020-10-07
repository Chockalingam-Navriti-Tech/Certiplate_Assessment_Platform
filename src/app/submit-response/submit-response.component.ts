import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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
  }

  clicked() {
    $('#div').css('display', 'none');
    $('#submit').css('display', 'none');
    $('#load').css('display', 'block');
    $('#progress').css('display', 'block');
    var response_object = JSON.parse(localStorage.getItem('Response_data'));
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
                    response_str.CandidateAssessmentData.VivaAssessment
                  ) {
                    if (
                      parseInt(
                        response_str.CandidateAssessmentData.VivaAssessment
                          .AssessmentStatus
                      ) != 4
                    ) {
                      document.getElementById('btn').style.display = 'block';
                    } else if (
                      parseInt(
                        response_str.CandidateAssessmentData.VivaAssessment
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
                  response_str.CandidateAssessmentData.VivaAssessment.AssessmentStatus = 4;
                  response_str.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push(
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
              response_str.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push(
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
          response_str.CandidateAssessmentData.VivaAssessment.AssessmentEvents.push(
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
