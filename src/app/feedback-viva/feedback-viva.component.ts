import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
let flag1: boolean;
let flag2: boolean;
let flag3: boolean;
let flag4: boolean;
let flag5: boolean;
@Component({
  selector: 'app-feedback-viva',
  templateUrl: './feedback-viva.component.html',
  styleUrls: ['./feedback-viva.component.css'],
})
export class FeedbackVivaComponent implements OnInit {
  data = JSON.parse(localStorage.getItem('Response_data'));
  constructor(private route:Router) {}
  ngOnInit(): void {
    var data = this.data;
    $(document).ready(function () {
      $.each(
        data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
          .Questions,
        function (index: number, value) {
          var id = (index + 1).toString();
          document.getElementById(id).innerHTML =
            index +
            1 +
            '. ' +
            data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
              .Questions[index].QuestionText +
            '<br/>';
          if (
            data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
              .Questions[index].Options
          ) {
            $.each(
              data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
                .Questions[index].Options,
              function (indices: number, value) {
                var opt_id = 'opt' + index + '_' + (indices + 1);
                document.getElementById(opt_id).innerHTML =
                  data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[
                    index
                  ].Options[indices].OptionText;
              }
            );
          }
        }
      );
      var id1, id2, id3, id4;
      var arr: string[];
      arr = [];
      $('input[name=groupOfDefaultRadios1]').change(function () {
        data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[1].Response =
          data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
            .Questions[1].QuestionId +
          '=>' +
          $(this).val();
        flag1 = true;
        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
          if (
            (document.getElementById('text') as HTMLInputElement).value != ''
          ) {
            data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[0].Response =
              data.CandidateAssessmentData.VivaMcqAssessment
                .FeedbackQuestionPaper.Questions[0].QuestionId +
              '=>' +
              (document.getElementById('text') as HTMLInputElement).value;
            $('#next').removeAttr('disabled');
          }
        }
      });
      $('select[name=groupOfDefaultRadios2]').change(function () {
        data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[2].Response =
          data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
            .Questions[2].QuestionId +
          '=>' +
          $(this).val();
        flag2 = true;
        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
          if (
            (document.getElementById('text') as HTMLInputElement).value != ''
          ) {
            data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[0].Response =
              data.CandidateAssessmentData.VivaMcqAssessment
                .FeedbackQuestionPaper.Questions[0].QuestionId +
              '=>' +
              (document.getElementById('text') as HTMLInputElement).value;
            $('#next').removeAttr('disabled');
          }
        }
      });
      $('input[name=groupOfDefaultRadios3]').change(function () {
        arr.push($(this).val() as string);
        data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[3].Response =
          data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
            .Questions[3].QuestionId +
          '=>' +
          arr;
        flag3 = true;
        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
          if (
            (document.getElementById('text') as HTMLInputElement).value != ''
          ) {
            data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[0].Response =
              data.CandidateAssessmentData.VivaMcqAssessment
                .FeedbackQuestionPaper.Questions[0].QuestionId +
              '=>' +
              (document.getElementById('text') as HTMLInputElement).value;
            $('#next').removeAttr('disabled');
          }
        }
      });
      $('select[name=groupOfDefaultRadios4]').change(function () {
        data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[4].Response =
          data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper
            .Questions[4].QuestionId +
          '=>' +
          $(this).val();
        flag4 = true;
        if (flag1 == true && flag2 == true && flag3 == true && flag4 == true) {
          if (
            (document.getElementById('text') as HTMLInputElement).value != ''
          ) {
            data.CandidateAssessmentData.VivaMcqAssessment.FeedbackQuestionPaper.Questions[0].Response =
              data.CandidateAssessmentData.VivaMcqAssessment
                .FeedbackQuestionPaper.Questions[0].QuestionId +
              '=>' +
              (document.getElementById('text') as HTMLInputElement).value;
            $('#next').removeAttr('disabled');
          }
        }
      });
    });
    this.data = data;
  }
  clicked() {
    this.data.CandidateAssessmentData.VivaMcqAssessment.AssessmentStatus = 3;
    localStorage.setItem('Response_data', JSON.stringify(this.data));
    this.route.navigate(['submit-response']);
  }
}
