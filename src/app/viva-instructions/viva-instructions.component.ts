import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
    $(document).ready(function () {
      function disablePrev() { window.history.forward() }
      //window.onload = disablePrev();
      window.onpageshow = function(evt:any) { if (evt.persisted) disablePrev() }
    })
    this.Req = localStorage.getItem('req_id');
    this.Id = localStorage.getItem('cand_id');
    this.ajaxcall();
  }
  ajaxcall() {
    var data = JSON.parse(
      localStorage.getItem(this.Req + '_' + this.Id + '_' + 'data')
    );
    $(document).ready(function () {
      var count = 1;
      $.each(
        data.CandidateAssessmentData.VivaInstructions[0].InstructionList,
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
}
