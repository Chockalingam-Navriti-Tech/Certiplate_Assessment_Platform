import { environment } from "./../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { element } from "protractor";
import {
  Component,
  OnInit,
  ɵConsole,
  ComponentFactoryResolver,
} from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-assessment-detail",
  templateUrl: "./assessment-detail.component.html",
  styles: [],
})
export class AssessmentDetailComponent {
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
      var lang = "";
      for (
        var i = 0;
        i < parseInt(data.CandidateAssessmentData.Languages.length);
        i++
      ) {
        if (i != parseInt(data.CandidateAssessmentData.Languages.length) - 1)
          lang +=
            data.CandidateAssessmentData.Languages[i].LanguageName + ", ";
        else lang += data.CandidateAssessmentData.Languages[i].LanguageName;
      }
      document.getElementById("tablecontent").innerHTML =
        "<br />" +
        '<b style="padding:10px"> Candidate Name : </b>' +
        data.CandidateAssessmentData.CandidateName +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> Registration Number : </b>' +
        data.CandidateAssessmentData.RegistrationId +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> Guardian Name : </b>' +
        data.CandidateAssessmentData.GuardianName +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> Assessment Batch :</b>' +
        data.CandidateAssessmentData.AssessmentBatchCode.toUpperCase() +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> SDMS Batch ID : </b>' +
        data.CandidateAssessmentData.SDMSBatchId.toUpperCase() +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> Project Name : </b>' +
        data.CandidateAssessmentData.ProjectName +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> Client Name : </b>' +
        data.CandidateAssessmentData.ClientName +
        "<hr style='height:1px;border-width:0;color:black;background-color:black'>" +
        '<b style="padding:10px"> Languages : </b>' +
        lang +
        "<br />" +
        "<br/>";
      if (data.CandidateAssessmentData.TheoryAssessment) {
        document.getElementById("vid1").style.visibility = "visible";
        document.getElementById("btn1").style.visibility = "visible";
      }
      if (data.CandidateAssessmentData.PracticalAssessment) {
        document.getElementById("vid2").style.visibility = "visible";
        document.getElementById("btn2").style.visibility = "visible";
      }
      if (data.CandidateAssessmentData.VivaMcqAssessment) {
        document.getElementById("vid3").style.visibility = "visible";
        document.getElementById("btn3").style.visibility = "visible";
      }
      if (
        parseInt(
          data.CandidateAssessmentData.TheoryAssessment.AssessmentStatus
        ) == 4
      ) {
        document.getElementById("btn1").className = "btn btn-success";
        document.getElementById("btn1").setAttribute("disabled", "disabled");
      }
      if (data.CandidateAssessmentData.PracticalAssessment) {
        if (
          parseInt(
            data.CandidateAssessmentData.PracticalAssessment.AssessmentStatus
          ) == 4
        ) {
          document.getElementById("btn2").className = "btn btn-success";
          document.getElementById("btn2").setAttribute("disabled", "disabled");
        }
      } else {
        if (
          parseInt(
            data.CandidateAssessmentData.VivaMcqAssessment.AssessmentStatus
          ) == 4
        ) {
          document.getElementById("btn3").className = "btn btn-success";
          document.getElementById("btn3").setAttribute("disabled", "disabled");
        }
      }
    });
  }

  clicked_theory() {
    localStorage.setItem("assessment", "theory");
    this.route.navigate(["image-capture"]);
  }
  clicked_practical() {
    localStorage.setItem("assessment", "practical");
    this.route.navigate(["image-capture"]);
  }
  clicked_viva() {
    localStorage.setItem("assessment", "viva");
    this.route.navigate(["image-capture"]);
  }
  vid_theory() {
    $("#example1").attr("src", environment.Theory_TutorialVideo_URL);
    document.getElementById("example1").style.display = "block";
    document.getElementById("example2").style.display = "none";
    document.getElementById("example3").style.display = "none";
    var lightBoxVideo = <HTMLVideoElement>document.getElementById("example1");
    window.scrollTo(0, 0);
    document.getElementById("light").style.display = "block";
    document.getElementById("fade").style.display = "block";
    lightBoxVideo.play();
  }
  vid_practical() {
    $("#example2").attr("src", environment.Practical_TutorialVideo_URL);
    document.getElementById("example2").style.display = "block";
    document.getElementById("example1").style.display = "none";
    document.getElementById("example3").style.display = "none";
    var lightBoxVideo = <HTMLVideoElement>document.getElementById("example2");
    window.scrollTo(0, 0);
    document.getElementById("light").style.display = "block";
    document.getElementById("fade").style.display = "block";
    lightBoxVideo.play();
  }

  vid_viva() {
    $("#example3").attr("src", environment.Viva_TutorialVideo_URL);
    document.getElementById("example3").style.display = "block";
    document.getElementById("example2").style.display = "none";
    document.getElementById("example1").style.display = "none";
    var lightBoxVideo = <HTMLVideoElement>document.getElementById("example3");
    window.scrollTo(0, 0);
    document.getElementById("light").style.display = "block";
    document.getElementById("fade").style.display = "block";
    lightBoxVideo.play();
  }
  close() {
    var lightBoxVideo1 = <HTMLVideoElement>document.getElementById("example1");
    var lightBoxVideo2 = <HTMLVideoElement>document.getElementById("example2");
    var lightBoxVideo3 = <HTMLVideoElement>document.getElementById("example3");
    document.getElementById("light").style.display = "none";
    document.getElementById("fade").style.display = "none";
    lightBoxVideo1.pause();
    lightBoxVideo2.pause();
    lightBoxVideo3.pause();
  }
}
