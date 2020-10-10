import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
      
      if (data.CandidateAssessmentData.Languages[1]) {
        document.getElementById(
          data.CandidateAssessmentData.Languages[1].LanguageName
        ).style.display = 'block';
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
