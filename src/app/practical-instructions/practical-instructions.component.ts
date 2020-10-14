import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
var option, id: any;
@Component({
  selector: 'app-practical-instructions',
  templateUrl: './practical-instructions.component.html',
  styleUrls: ['./practical-instructions.component.css'],
})
export class PracticalInstructionsComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}

  Req: string;
  Id: string;

  ngOnInit(): void {
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');

    var data = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    
    $(function () {
      for (
        var i = 0;
        i < parseInt(data.CandidateAssessmentData.Languages.length);
        i++
      ) {
        document.getElementById(
          data.CandidateAssessmentData.Languages[i]
            .LanguageName
        ).style.display = "block";
      }
    });

    $(document).ready(function () {
      function disablePrev() {
        window.history.forward();
      }
      //window.onload = disablePrev();
      window.onpageshow = function (evt: any) {
        if (evt.persisted) disablePrev();
      };
    });
    this.func();
  }
  func() {
    var data = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    $(document).ready(function () {
      var count = 1;
      $.each(
        data.CandidateAssessmentData.PracticalInstructions[0].InstructionList,
        function (index: number, value) {
          document.getElementById('tablecontent').innerHTML +=
            '<br/>' +
            '<b style="padding:14px">' +
            count +
            ': </b>' +
            '<b style="padding:10px">' +
            value +
            ' </b>' +
            '<br/>' +
            '<br/>' +
            "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
          count += 1;
        }
      );
      $('#dropdown').change(function () {
        option = $('option:selected').attr('id');
        if (option == 'Hindi') id = 1;
        else if (option == 'Tamil') id = 2;
        else if (option == 'Kannada') id = 3;
        else if (option == 'Telugu') id = 4;
        else if (option == 'Malayalam') id = 5;
        else if (option == 'Gujarati') id = 6;
        else if (option == 'Marati') id = 7;
        else if (option == 'Bengali') id = 8;
        else id = 0;
        if (id == 0) {
          document.getElementById('tablecontent').innerHTML = " ";
          var count = 1;
          $.each(
            data.CandidateAssessmentData.PracticalInstructions[0].InstructionList,
            function (index: number, value) {
              document.getElementById('tablecontent').innerHTML +=
                '<br/>' +
                '<b style="padding:14px">' +
                count +
                ': </b>' +
                '<b style="padding:10px">' +
                value +
                ' </b>' +
                '<br/>' +
                '<br/>' +
                "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
              count += 1;
            }
          );
        }
        else {
          document.getElementById('tablecontent').innerHTML = " ";
          var count = 1;
          var value_lang = data.CandidateAssessmentData.PracticalInstructions[1].InstructionList;
          $.each(
            data.CandidateAssessmentData.PracticalInstructions[0].InstructionList,
            function (index: number, value) {
              document.getElementById('tablecontent').innerHTML +=
                '<br/>' +
                '<b style="padding:14px">' +
                count +
                ': </b>' +
                '<b style="padding:10px">' +
                value +
              ' </b>' +
              '<br/>' +
                value_lang[index]+
                '<br/>' +
                '<br/>' +
                "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
              count += 1;
            }
          );
        }
      });
      $('#materialchecked').click(function () {
        if ($(this).is(':checked')) {
          $('#submit_button').removeAttr('disabled');
        } else {
          $('#submit_button').attr('disabled', 'disabled');
        }
      });
    });
  }
  clicked() {
    let element = document.documentElement;
    if (element.requestFullscreen) element.requestFullscreen();
    this.route.navigate(['practical-assessment']);
  }
}
