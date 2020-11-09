import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
var option, id:any;
@Component({
  selector: 'app-viva-instructions',
  templateUrl: './viva-instructions.component.html',
  styleUrls: ['./viva-instructions.component.css'],
})
export class VivaInstructionsComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}

  Req: string;
  Id: string;
  ngOnInit(): void {
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');
    var varCandidateAssessmentData = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    $(function () {
      for (
        var i = 0;
        i < parseInt(varCandidateAssessmentData.CandidateAssessmentData.Languages.length);
        i++
      ) {
        document.getElementById(
          varCandidateAssessmentData.CandidateAssessmentData.Languages[i]
            .LanguageName
        ).style.display = "block";
      }
    });
    this.ajaxcall();
  }
  ajaxcall() {
    var data = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    $(document).ready(function () {
      var count = 1;
      $.each(
        data.CandidateAssessmentData.VivaMcqInstructions[0].InstructionList,
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
        if (option == "Hindi") id = 1;
        else if (option == "Tamil") id = 2;
        else if (option == "Telugu") id = 3;
        else if (option == "Kannada") id = 4;
        else if (option == "Gujarati") id = 5;
        else if (option == "Oriya") id = 6;
        else if (option == "Assamese") id = 7;
        else if (option == "Urdu") id = 8; 
        else if (option == "Marati") id = 9;
        else if (option == "Malayalam") id = 10;  
        else if (option == "Bengali") id = 11;
        else if (option == "Punjabi") id = 12;
        else if (option == "Manipuri") id = 13;
        else id = 0;
        if (id == 0) {
          document.getElementById('tablecontent').innerHTML = " ";
          var count = 1;
          $.each(
            data.CandidateAssessmentData.VivaMcqInstructions[0].InstructionList,
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
          var value_lang = data.CandidateAssessmentData.VivaMcqInstructions[id].InstructionList;
          $.each(
            data.CandidateAssessmentData.VivaMcqInstructions[0].InstructionList,
            function (index: number, value) {
              document.getElementById('tablecontent').innerHTML +=
              "<br/>" +
              '<b style="padding:14px">' +
              count +
              ':</b>' +
              '<b style="padding:14px">' +
              value +
              ' </b>' +
              "<br/><div style='padding:7px 55.5px'>" +
              value_lang[index] +
              '<br/>' +
              '<br/></div>' +
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
    this.route.navigate(['viva-assessment']);
  }
}
