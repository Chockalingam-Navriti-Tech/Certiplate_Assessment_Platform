import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

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
    $(document).ready(function () {
      document.getElementById("instruction").innerHTML =
        "<br />" +
        '<b style="padding:10px"> 1 : </b>' +
        "<b> " +
        data.CandidateAssessmentData.GeneralInstructions[0].InstructionList[0] +
        "</b>" +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> 2 : </b>' +
        "<b>" +
        data.CandidateAssessmentData.GeneralInstructions[0].InstructionList[1] +
        "</b>" +
        "<br />" +
        "<br/>";
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
