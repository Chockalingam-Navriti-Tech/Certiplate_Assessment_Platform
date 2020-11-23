import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { encode } from "punycode";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { environment } from "src/environments/environment";
import * as moment from "moment";

declare var $: any;
var req, cand;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: HTMLInputElement;
  password: HTMLInputElement;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  test() {
    $("#login").css("display", "none");
    $("#log-in").css("display", "block");
    this.username = document.getElementById("username") as HTMLInputElement;
    this.password = document.getElementById("pwd") as HTMLInputElement;
    if (this.username.value == "" || this.password.value == "") {
      document.getElementById("warning").innerHTML =
        "<b> <h2>" + "Login Id and password field are required" + "</h2></b>";
      $("#login").css("display", "block");
      $("#log-in").css("display", "none");
    } else if (this.username && this.password) {
      localStorage.setItem(this.username.value, this.password.value);
      if (/^\d+$/.test(this.username.value) == true) {
        let element = document.documentElement;
        if (element.requestFullscreen) element.requestFullscreen();
        this.login();
      } else if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          this.username.value
        )
      ) {
        this.assessor_login();
      } else {
        window.alert("Opps!!!");
      }
    }
  }
  login() {
    $.ajax({
      url: environment.URL_authentication,
      type: "POST",
      dataType: "json",
      data: {
        apiKey: environment.api_key,
        RegistrationId: this.username.value,
        password: localStorage.getItem(this.username.value),
        Sender: "PROCTORED_BROWSER",
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        localStorage.setItem(
          this.username.value + "_" + this.password.value,
          JSON.stringify(data)
        );
        if (json.CandidateAssessmentAuthentication.Message == "Success") {
          let output = moment().format("DD-MMM-YYYY") as string;
          if (
            output == json.CandidateAssessmentAuthentication.ScheduledStartDate
          ) {
            $.ajax({
              url: environment.URL_datarequest,
              type: "POST",
              dataType: "json",
              data: {
                apiKey: environment.api_key,
                RegistrationId: this.username.value,
                password: this.password.value,
              },
              success: (data) => {
                if (
                  parseInt(
                    json.CandidateAssessmentAuthentication.CandidateAttemptCount
                  ) >
                  parseInt(
                    json.CandidateAssessmentAuthentication.MaximumAttemptCount
                  )
                ) {
                  document.getElementById("warning").innerHTML =
                    "<b> <h2>" + "Exceeded Maximum Attempt Count" + "</h2></b>";
                  $("#login").css("display", "block");
                  $("#log-in").css("display", "none");
                } else {
                  req = this.username.value;
                  cand = this.password.value;
                  localStorage.setItem("req_id", this.username.value);
                  localStorage.setItem("cand_id", this.password.value);
                  if (localStorage.getItem(req + "_" + cand + "_data")) {
                    var data = JSON.parse(
                      localStorage.getItem(req + "_" + cand + "_data")
                    );
                    if (
                      localStorage.getItem(req + "_" + cand + "_assessment") ==
                      "theory"
                    ) {
                      if (
                        data.CandidateAssessmentData.TheoryAssessment.StartImage
                          .FileName == "" ||
                        data.CandidateAssessmentData.TheoryAssessment
                          .IdentityImage.FileName == ""
                      )
                        this.route.navigate(["image-capture"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment.StartImage
                          .FileName != "" &&
                        data.CandidateAssessmentData.TheoryAssessment
                          .IdentityImage.FileName != "" &&
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "0"
                      ) {
                        this.route.navigate(["theory-instructions"]);
                      } else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "1"
                      ) {
                        $("#mymodal").modal("show");
                      } else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "2" &&
                        data.CandidateAssessmentData.TheoryAssessment.EndImage
                          .FileName == ""
                      )
                        this.route.navigate(["end-image-capture"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment.EndImage
                          .FileName != "" &&
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "2"
                      )
                        this.route.navigate(["feedback-theory"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "3"
                      )
                        this.route.navigate(["submit-response"]);
                      if (data.CandidateAssessmentData.PracticalAssessment) {
                        if (
                          data.CandidateAssessmentData.TheoryAssessment
                            .AssessmentStatus == "4" &&
                          data.CandidateAssessmentData.PracticalAssessment
                            .AssessmentStatus != "4"
                        )
                          this.route.navigate(["assessment-details"]);
                        else if (
                          data.CandidateAssessmentData.TheoryAssessment
                            .AssessmentStatus == "4" &&
                          data.CandidateAssessmentData.PracticalAssessment
                            .AssessmentStatus == "4"
                        ) {
                          document.getElementById(
                            "warning"
                          ).style.backgroundColor = "lawngreen";
                          document.getElementById("warning").innerHTML =
                            "<b> <h2>" +
                            "You have completed the assessment" +
                            "</h2></b>";
                          $("#login").css("display", "block");
                          $("#log-in").css("display", "none");
                        }
                      } else if (
                        data.CandidateAssessmentData.VivaMcqAssessment
                      ) {
                        if (
                          data.CandidateAssessmentData.TheoryAssessment
                            .AssessmentStatus == "4" &&
                          data.CandidateAssessmentData.VivaMcqAssessment
                            .AssessmentStatus != "4"
                        )
                          this.route.navigate(["assessment-details"]);
                        else if (
                          data.CandidateAssessmentData.TheoryAssessment
                            .AssessmentStatus == "4" &&
                          data.CandidateAssessmentData.VivaMcqAssessment
                            .AssessmentStatus == "4"
                        ) {
                          document.getElementById(
                            "warning"
                          ).style.backgroundColor = "lawngreen";
                          document.getElementById("warning").innerHTML =
                            "<b> <h2>" +
                            "You have completed the assessment" +
                            "</h2></b>";
                          $("#login").css("display", "block");
                          $("#log-in").css("display", "none");
                        }
                      }
                    } else if (
                      localStorage.getItem(req + "_" + cand + "_assessment") ==
                      "practical"
                    ) {
                      if (
                        data.CandidateAssessmentData.PracticalAssessment
                          .StartImage.FileName == "" ||
                        data.CandidateAssessmentData.PracticalAssessment
                          .IdentityImage.FileName == ""
                      )
                        this.route.navigate(["image-capture"]);
                      else if (
                        data.CandidateAssessmentData.PracticalAssessment
                          .StartImage.FileName != "" &&
                        data.CandidateAssessmentData.PracticalAssessment
                          .IdentityImage.FileName != "" &&
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "0"
                      ) {
                        this.route.navigate(["practical-instructions"]);
                      } else if (
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "1"
                      ) {
                        $("#mymodal").modal("show");
                      } else if (
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "2" &&
                        data.CandidateAssessmentData.PracticalAssessment
                          .EndImage.FileName == ""
                      )
                        this.route.navigate(["end-image-capture"]);
                      else if (
                        data.CandidateAssessmentData.PracticalAssessment
                          .EndImage.FileName != "" &&
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "2"
                      )
                        this.route.navigate(["feedback-practical"]);
                      else if (
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "3"
                      )
                        this.route.navigate(["submit-response"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus != "4" &&
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "4"
                      )
                        this.route.navigate(["assessment-details"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "4" &&
                        data.CandidateAssessmentData.PracticalAssessment
                          .AssessmentStatus == "4"
                      ) {
                        document.getElementById(
                          "warning"
                        ).style.backgroundColor = "lawngreen";
                        document.getElementById("warning").innerHTML =
                          "<b> <h2>" +
                          "You have completed the assessment" +
                          "</h2></b>";
                        $("#login").css("display", "block");
                        $("#log-in").css("display", "none");
                      }
                    } else if (
                      localStorage.getItem(req + "_" + cand + "_assessment") ==
                      "viva"
                    ) {
                      if (
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .StartImage.FileName == "" ||
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .IdentityImage.FileName == ""
                      )
                        this.route.navigate(["image-capture"]);
                      else if (
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .StartImage.FileName != "" &&
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .IdentityImage.FileName != "" &&
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "0"
                      ) {
                        this.route.navigate(["viva-instructions"]);
                      } else if (
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "1"
                      ) {
                        $("#mymodal").modal("show");
                      } else if (
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "2" &&
                        data.CandidateAssessmentData.VivaMcqAssessment.EndImage
                          .FileName == ""
                      )
                        this.route.navigate(["end-image-capture"]);
                      else if (
                        data.CandidateAssessmentData.VivaMcqAssessment.EndImage
                          .FileName != "" &&
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "2"
                      )
                        this.route.navigate(["feedback-viva"]);
                      else if (
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "3"
                      )
                        this.route.navigate(["submit-response"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus != "4" &&
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "4"
                      )
                        this.route.navigate(["assessment-details"]);
                      else if (
                        data.CandidateAssessmentData.TheoryAssessment
                          .AssessmentStatus == "4" &&
                        data.CandidateAssessmentData.VivaMcqAssessment
                          .AssessmentStatus == "4"
                      ) {
                        document.getElementById(
                          "warning"
                        ).style.backgroundColor = "lawngreen";
                        document.getElementById("warning").innerHTML =
                          "<b> <h2>" +
                          "You have completed the assessment" +
                          "</h2></b>";
                        $("#login").css("display", "block");
                        $("#log-in").css("display", "none");
                      }
                    } else this.route.navigate(["assessment-details"]);
                  } else {
                    var datas = JSON.parse(JSON.stringify(data));
                    datas.CandidateAssessmentData.TheoryAssessment.AssessmentStatus = 0;
                    if (datas.CandidateAssessmentData.PracticalAssessment)
                      datas.CandidateAssessmentData.PracticalAssessment.AssessmentStatus = 0;
                    else
                      datas.CandidateAssessmentData.VivaMcqAssessment.AssessmentStatus = 0;
                    localStorage.setItem("req_id", this.username.value);
                    localStorage.setItem("cand_id", this.password.value);
                    localStorage.setItem(
                      this.username.value +
                        "_" +
                        this.password.value +
                        "_" +
                        "data",
                      JSON.stringify(datas)
                    );
                    this.route.navigate(["general-instructions"]);
                  }
                }
              },
              error: function (err) {
                console.log("error:" + err);
              },
            });
          } else {
            document.getElementById("warning").innerHTML =
              "<b><h2>" +
              "No assessment has been scheduled for you today! Please contact the system administrator for assistance" +
              "</h2></b>";
            $("#login").css("display", "block");
            $("#log-in").css("display", "none");
          }
        } else {
          document.getElementById("warning").innerHTML =
            "<b><h2>" +
            json.CandidateAssessmentAuthentication.Message +
            "</h2></b>";
          $("#login").css("display", "block");
          $("#log-in").css("display", "none");
        }
      },
      error: function (err) {
        console.log("error:" + err);
        $("#login").css("display", "block");
        $("#log-in").css("display", "none");
      },
    });
  }
  assessor_login() {
    $.ajax({
      url: environment.URL_authentication_email,
      type: "POST",
      dataType: "json",
      data: {
        ApiKey: environment.ApiKey,
        LoginId: this.username.value,
        password: this.password.value,
        ClientIpAddress: environment.ClientIP,
        ClientBrowser: environment.ClientBrowser,
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        localStorage.setItem(
          json.AuthenticationResponseData.UserId,
          JSON.stringify(data)
        );
        localStorage.setItem("UserId", json.AuthenticationResponseData.UserId);
        localStorage.setItem(
          "UserRoleId",
          json.AuthenticationResponseData.UserRoleId
        );
        sessionStorage.setItem("req_id", this.username.value);
        sessionStorage.setItem(
          "UserId",
          json.AuthenticationResponseData.UserId
        );
        sessionStorage.setItem("password", this.password.value);
        sessionStorage.setItem(
          'SessionId',
          json.AuthenticationResponseData.SessionId
        );
        if (
          json.AuthenticationResponseData.Message ==
          "User authentication success"
        ) {
          this.route.navigate(["proctor-count-views"]);
        } else {
          document.getElementById("warning").innerHTML =
            "<b><h2>" + json.AuthenticationResponseData.Message + "</h2></b>";
          $("#login").css("display", "block");
          $("#log-in").css("display", "none");
        }
      },
      error: function (err) {
        console.log("error:" + err);
        $("#login").css("display", "block");
        $("#log-in").css("display", "none");
      },
    });
  }
  clicked() {
    let element = document.documentElement;
    if (element.requestFullscreen) element.requestFullscreen();
    if (localStorage.getItem(req + "_" + cand + "_assessment") == "theory")
      this.route.navigate(["theory-assessment"]);
    else if (
      localStorage.getItem(req + "_" + cand + "_assessment") == "practical"
    )
      this.route.navigate(["practical-assessment"]);
    else if (localStorage.getItem(req + "_" + cand + "_assessment") == "viva")
      this.route.navigate(["viva-assessment"]);
  }
}
