import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
var option, id: any;
var lang = [];

@Component({
  selector: "app-general-instructions",
  templateUrl: "./general-instructions.component.html",
  styleUrls: ["./general-instructions.component.css"],
})
export class GeneralInstructionsComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}
  Req: string;
  Id: string;
  ngOnInit(): void {
    this.Req = localStorage.getItem("req_id");
    this.Id = localStorage.getItem("cand_id");
    this.ajaxcall();
  }

  ajaxcall() {
    var data = JSON.parse(
      localStorage.getItem(this.Req + "_" + this.Id + "_" + "data")
    );
    for (
      var i = 0;
      i < parseInt(data.CandidateAssessmentData.Languages.length);
      i++
    ) {
      var obj = data.CandidateAssessmentData.Languages[i];
      obj = obj.LanguageName as string;
      lang.push({ obj, i });
    }
    for (
      var i = 0;
      i < parseInt(data.CandidateAssessmentData.Languages.length);
      i++
    ) {
      document.getElementById(
        data.CandidateAssessmentData.Languages[i].LanguageName
      ).style.display = "block";
    }

    $(document).ready(function () {
      var count = 1;
      $.each(
        data.CandidateAssessmentData.GeneralInstructions[0].InstructionList,
        function (index: number, value) {
          document.getElementById("tablecontent").innerHTML +=
            "<br/>" +
            '<b style="padding:14px">' +
            count +
            ":</b>" +
            '<b style="padding:5px">' +
            value +
            " </b>" +
            "<br/>" +
            "<br/>" +
            "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
          count += 1;
        }
      );

      $("#dropdown").change(function () {
        option = $("option:selected").attr("id");
        lang.find(function (item, ind) {
          if (item.obj == option) id = item.i;
        });
        if (id == 0) {
          document.getElementById("tablecontent").innerHTML = " ";
          var count = 1;
          $.each(
            data.CandidateAssessmentData.GeneralInstructions[0].InstructionList,
            function (index: number, value) {
              document.getElementById("tablecontent").innerHTML +=
                "<br/>" +
                '<b style="padding:14px">' +
                count +
                ":</b>" +
                '<b style="padding:5px">' +
                value +
                " </b>" +
                "<br/>" +
                "<br/>" +
                "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
              count += 1;
            }
          );
        } else {
          document.getElementById("tablecontent").innerHTML = " ";
          var count = 1;
          var value_lang =
            data.CandidateAssessmentData.GeneralInstructions[id]
              .InstructionList;
          $.each(
            data.CandidateAssessmentData.GeneralInstructions[0].InstructionList,
            function (index: number, value) {
              document.getElementById("tablecontent").innerHTML +=
                "<br/>" +
                '<b style="padding:14px">' +
                count +
                ":</b>" +
                '<b style="padding:14px">' +
                value +
                " </b>" +
                "<br/><div style='padding:7px 56px'>" +
                value_lang[index] +
                "<br/>" +
                "<br/></div>" +
                "<hr style='heigth:1px;border-width:20;color:black;background-color:black'>";
              count += 1;
            }
          );
        }
      });

      $("#materialchecked").click(function () {
        //check if checkbox is checked
        if ($(this).is(":checked")) {
          $("#submit_button").removeAttr("disabled"); //enable input
        } else {
          $("#submit_button").attr("disabled", "disabled"); //disable input
        }
      });
    });
  }

  clicked() {
    this.route.navigate(["assessment-details"]);
  }
}
