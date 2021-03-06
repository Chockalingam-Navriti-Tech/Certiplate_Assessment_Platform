import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
var option, id: any;
var lang = [];
@Component({
  selector: "app-theory-instructions",
  templateUrl: "./theory-instructions.component.html",
  styleUrls: ["./theory-instructions.component.css"],
})
export class TheoryInstructionsComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}

  Req: string;
  Id: string;
  ngOnInit(): void {
    this.Req = localStorage.getItem("req_id");
    this.Id = localStorage.getItem("cand_id");
    let varCandidateAssessmentData = JSON.parse(
      localStorage.getItem(this.Req + "_" + this.Id + "_" + "data")
    );

    $(function () {
      for (
        var i = 0;
        i <
        parseInt(
          varCandidateAssessmentData.CandidateAssessmentData.Languages.length
        );
        i++
      ) {
        var obj =
          varCandidateAssessmentData.CandidateAssessmentData.Languages[i];
        obj = obj.LanguageName as string;
        lang.push({ obj, i });
      }
      for (
        var i = 0;
        i <
        parseInt(
          varCandidateAssessmentData.CandidateAssessmentData.Languages.length
        );
        i++
      ) {
        console.log(
          varCandidateAssessmentData.CandidateAssessmentData.Languages[i]
            .LanguageName
        );
        document.getElementById(
          varCandidateAssessmentData.CandidateAssessmentData.Languages[i]
            .LanguageName
        ).style.display = "block";
      }
    });
    this.func();
  }
  func() {
    var data = JSON.parse(
      localStorage.getItem(this.Req + "_" + this.Id + "_" + "data")
    );
    $(document).ready(function () {
      var count = 1;
      $.each(
        data.CandidateAssessmentData.TheoryInstructions[0].InstructionList,
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
            data.CandidateAssessmentData.TheoryInstructions[0].InstructionList,
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
            data.CandidateAssessmentData.TheoryInstructions[id].InstructionList;
          $.each(
            data.CandidateAssessmentData.TheoryInstructions[0].InstructionList,
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
        if ($(this).is(":checked")) {
          $("#submit_button").removeAttr("disabled");
        } else {
          $("#submit_button").attr("disabled", "disabled");
        }
      });
    });
  }
  clicked() {
    let element = document.documentElement;
    if (element.requestFullscreen) element.requestFullscreen();
    this.route.navigate(["theory-assessment"]);
  }
}
