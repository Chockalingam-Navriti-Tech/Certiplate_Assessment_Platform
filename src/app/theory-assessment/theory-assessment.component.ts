import { environment } from "./../../environments/environment";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import html2canvas from "html2canvas";
import * as mobileNet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
var snapstream = require("snapstream");
import { CountdownComponent } from "ngx-countdown";
import * as moment from "moment";

var localstream: any;
var option, route: any;
var id = 0;
var count: number;
var counter = 1;
var index: number;
var sec: number;
var quest;
var fullscreen = 0;
var exit_full_screen = 0;
var attempted_count = 0;
var marked_review = 0;
var full_screen;
var visibility;
let timer = false;
var id1, id2, id3, id4, id5;
var varCandidateAssessmentData;
var EventImage = "";

declare var $: any;
declare var window: any;
var constraints = {
  video: {
    facingMode: "user",
    width: 1280,
    height: 720,
  },
  audio: false,
};

@Component({
  selector: "app-theory-assessment",
  templateUrl: "./theory-assessment.component.html",
  styleUrls: ["./theory-assessment.component.css"],
})
export class TheoryAssessmentComponent implements OnInit {
  public question: string;
  varNotifyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  vdo: any;
  detectedObjects: any = [];
  classifications: any = [];
  Req: any;
  Id: any;
  data: any;
  LeftTime: any = JSON.parse(
    localStorage.getItem(
      localStorage.getItem("req_id") +
        "_" +
        localStorage.getItem("cand_id") +
        "_" +
        "data"
    )
  ).CandidateAssessmentData.TheoryAssessment.RemainingDurationSeconds;
  time_array: any = [];
  //id2: any;
  constructor(
    private route: Router,
    private elem: ElementRef,
    countdown: CountdownComponent
  ) {
    this.Req = localStorage.getItem("req_id");
    this.Id = localStorage.getItem("cand_id");
    this.data = JSON.parse(
      localStorage.getItem(this.Req + "_" + this.Id + "_" + "data")
    );
    var left = this.LeftTime;
    while (left >= 2) {
      this.time_array.push(left - 1);
      left -= 1;
    }
  }

  /*async classifyImage(video: any) {
    const modelPromise = await cocoSsd.load();
    if (
      this.elem.nativeElement.querySelector("#myVideo").play() !== undefined
    ) {
      this.elem.nativeElement
        .querySelector("#myVideo")
        .play()
        .then(async (_) => {
          const model = await mobileNet.load();
          this.classifications = await model.classify(video);
          modelPromise.detect(video).then(async (predict) => {
            console.log(predict);
            requestAnimationFrame(() => {
              this.classifyImage.apply(this);
            });
          });
        })
        .catch((err: any) => {
          console.warn(err);
        });
    }
  }*/

  ngOnInit(): void {
    varCandidateAssessmentData = this.data;
    route = this.route;
    $(function () {
      for (
        var i = 0;
        i <
        parseInt(
          varCandidateAssessmentData.CandidateAssessmentData.Languages.length
        );
        i++
      ) {
        document.getElementById(
          varCandidateAssessmentData.CandidateAssessmentData.Languages[i]
            .LanguageName
        ).style.display = "block";
      }
    });

    var id = $("#card").attr("id");
    let nos = 1;
    var i_length =
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
        .Sections.length;

    for (let i = 0; i < i_length; i++) {
      $("#card").append(
        '<div class="row justify-content-center">' +
          '<p class="card-text">Section-' +
          (i + 1) +
          "</p><br /></div>" +
          '<div class="row justify-content-center">'
      );
      var j_length =
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[i].Questions.length;
      for (let j = 0; j < j_length; j++) {
        var ids = "sec" + (i + 1) + "_" + (j + 1);
        $("#card").append(
          '<button id="' +
            ids +
            '" type= "button" class="btn btn-danger px-3" value="' +
            nos +
            '" >' +
            nos +
            "</button>"
        );
        nos += 1;
      }
      $("#card").append("</div>");
    }

    let clicked = this.clicked;

    $(function () {
      $("button").click(function () {
        if (this.id.startsWith("sec")) {
          let section = this.id.split("_");
          clicked(section[0], section[1], this.textContent);
        }
      });
    });

    /*navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
      this.elem.nativeElement.querySelector("#myVideo").srcObject = stream;
      this.vdo = this.elem.nativeElement.querySelector("#myVideo");
      id5 = setInterval(() => {
        this.classifyImage(this.vdo);
      }, 2000);
    });*/

    document.addEventListener(
      "contextmenu",
      (id4 = (event: any) => event.preventDefault())
    );

    $("body").on("cut copy paste", function (e: any) {
      e.preventDefault();
    });

    if (
      parseInt(
        varCandidateAssessmentData.CandidateAssessmentData.CandidateAttemptCount
      ) == 1
    ) {
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "ASSESSMENT_STARTED",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
    } else if (
      parseInt(
        varCandidateAssessmentData.CandidateAssessmentData.CandidateAttemptCount
      ) > 1
    ) {
      attempted_count = 0;
      marked_review = 0;
      $.each(
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections,
        function (index: number, value) {
          $.each(
            varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
              .Sections[index].Questions,
            function (ind: number, values) {
              if (
                varCandidateAssessmentData.CandidateAssessmentData
                  .TheoryAssessment.Sections[index].Questions[ind]
                  .CandidateCurrentResponseOption != "-1"
              ) {
                attempted_count += 1;
              }
            }
          );
        }
      );
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "ASSESSMENT_CONTINUED",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
    }

    $(document).ready(function () {
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .AssessmentStartDateTime == ""
      )
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.AssessmentStartDateTime = moment().format(
          "DD-MMM-YYYY h:mm:ss a"
        );
      $("#dropdown").change(function () {
        var key: string = "";
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log(
          "QUESTION_LANGUAGE_CHANGED",
          varCandidateAssessmentData,
          sec,
          index,
          key
        );
      });
      $.each(
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections,
        function (index: number, value) {
          $.each(
            varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
              .Sections[index].Questions,
            function (ind: number, values) {
              if (
                varCandidateAssessmentData.CandidateAssessmentData
                  .TheoryAssessment.Sections[index].Questions[ind]
                  .CandidateCurrentResponseOption != "-1"
              ) {
                var sections = "sec" + (index + 1) + "_" + (ind + 1);
                document.getElementById(sections).className =
                  "btn btn-success px-3";
              }
            }
          );
        }
      );
    });
    varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.AssessmentStatus = 1;
    var minutes = Math.floor(
      this.data.CandidateAssessmentData.QuestionPaperDurationSeconds / 60
    );
    var seconds =
      this.data.CandidateAssessmentData.QuestionPaperDurationSeconds -
      minutes * 60;
    document.getElementById("info1").innerHTML =
      "<b>Candidate Name : " +
      this.data.CandidateAssessmentData.CandidateName +
      "</b>" +
      "<br/>" +
      "<b>Registration Id : " +
      this.data.CandidateAssessmentData.RegistrationId +
      "</b>";
    document.getElementById("info2").innerHTML =
      "<b>Question Paper Title : " +
      this.data.CandidateAssessmentData.QuestionPaperTitle +
      "</b>" +
      "<br/>" +
      "<b>Sections : " +
      this.data.CandidateAssessmentData.TheoryAssessment.Sections.length +
      "</b>";
    document.getElementById("info3").innerHTML =
      "<b>Job : " +
      this.data.CandidateAssessmentData.QualificationPackName +
      "</b>" +
      "<br/>" +
      "<b>Duration : " +
      minutes +
      " m : " +
      seconds +
      " s" +
      "</b>";

    sec = 0;
    count = 1;
    varCandidateAssessmentData = this.data;

    $("input[name=groupOfDefaultRadios]").change(function () {
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      var selected = "sec" + (sec + 1) + "_" + (index + 1);
      if (document.getElementById(selected).className != "btn btn-success px-3")
        attempted_count += 1;
      var id = $("input[name=groupOfDefaultRadios]:checked").attr("id");
      if (
        document.getElementById(selected).className == "btn btn-warning px-3"
      ) {
        document.getElementById(selected).classList.remove("btn-warning");
        if (
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].CandidateCurrentResponseOption !=
          "-1"
        )
          attempted_count -= 1;
        $("#checkbox").prop("checked", false);
        marked_review -= 1;
      }
      document.getElementById(selected).className = "btn btn-success px-3";
      if (id == "Group1")
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
          sec
        ].Questions[index].CandidateCurrentResponseOption = "0";
      if (id == "Group2")
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
          sec
        ].Questions[index].CandidateCurrentResponseOption = "1";
      if (id == "Group3")
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
          sec
        ].Questions[index].CandidateCurrentResponseOption = "2";
      if (id == "Group4")
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
          sec
        ].Questions[index].CandidateCurrentResponseOption = "3";

      Event_log("OPTION_SELECTED", varCandidateAssessmentData, sec, index, key);
    });
    //storing data for every 5 sec
    id3 = setInterval(() => {
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.RemainingDurationSeconds = parseInt(
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .TotalDurationSeconds
      );
      localStorage.setItem(
        this.Req + "_" + this.Id + "_" + "data",
        JSON.stringify(varCandidateAssessmentData)
      );
    }, 5000);

    window.requestFileSystem =
      window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(
      window.TEMPORARY,
      100 * 1024 * 1024,
      this.onInitFs,
      errorHandler
    );

    this.initial();
  }

  onInitFs(fs: any) {
    let data = varCandidateAssessmentData;
    var ImageArrayObj;
    let lat = localStorage.getItem("lat");
    let long = localStorage.getItem("long");
    //visibility change

    document.addEventListener(
      "keydown",
      (visibility = function () {
        $.ajax({
          url: environment.Violation_Api,
          type: 'POST',
          dataType: 'json',
          data: {
            ApiKey: environment.api_key,
            CandidateId:varCandidateAssessmentData.CandidateAssessmentData.CandidateId,
            RequestId:varCandidateAssessmentData.CandidateAssessmentData.AssessmentRequestId,
            ViolationCode:'APP_SWITCHING'
          },
          success: function (data) {
            console.log(data);
          }
        });
        if (exit_full_screen > 4) {
          exit_full_screen = 0;
        }
        exit_full_screen += 1;
        var key: string = "";
        $(document).keydown(function (e) {
          key = e.key;
        });
        $("#popup").css({
          opacity: 1,
        });
        if (exit_full_screen == 4) {
          document.getElementById("message").innerHTML =
            "<h1>" +
            "Unauthorized key pressed<br><br>You only have no chances left<br>" +
            "</h1>";
        } else if (exit_full_screen < 4) {
          document.getElementById("message").innerHTML =
            "<h1>" +
            "Unauthorized key pressed<br><br>You only have " +
            (4 - exit_full_screen) +
            " chances left<br>" +
            "</h1>";
        }
        $(".fullscreen-container").fadeTo(200, 1);
        $("#ok").click(function () {
          if (exit_full_screen < 4) {
            $("#popup").css({
              opacity: 0,
            });
            $(".fullscreen-container").fadeOut(200);
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen();
            }
          } else if (exit_full_screen >= 4) {
            $("#popup").css({
              opacity: 1,
            });
            document.getElementById("message").innerHTML =
              "<h1>" + "You have violated the rules<br>" + "</h1>";
            $(".fullscreen-container").fadeTo(200, 1);
            $("#ok").click(function () {
              exit_full_screen = 0;
              fullscreen = 0;
              route.navigate(["login"]);
            });
          }
        });
        html2canvas(document.body).then(function (canvas: any) {
          var ScreenshotImage = {
            Filename: "",
            TimeStamp: "",
            Latitude: "",
            Longitude: "",
          };
          ScreenshotImage.Filename =
            "REG" +
            varCandidateAssessmentData.CandidateAssessmentData.RegistrationId +
            "_TheoryViolation_" +
            moment().format("YYYYMMDDhhmmss") +
            ".jpeg";
          ScreenshotImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
          ScreenshotImage.Latitude = lat as string;
          ScreenshotImage.Longitude = long as string;
          ImageArrayObj = {
            FileName: "",
            Image_Data: "",
          };
          ImageArrayObj.FileName = ScreenshotImage.Filename;
          ImageArrayObj.Image_Data = canvas.toDataURL("image/jpeg");
          EventImage = ImageArrayObj.FileName;
          Event_log("TAB_SWITCH", data, sec, index, key);
          //ImageArrayContent.ImageArray.push(ImageArrayObj);
          //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.ScreenshotImages.push(
            ScreenshotImage
          );
          WriteFileToFileSystem(
            fs,
            ImageArrayObj.FileName,
            ImageArrayObj.Image_Data
          );
        });
      })
    );

    //fullscreen change
    document.addEventListener(
      "fullscreenchange",
      (full_screen = function (event: any) {
        fullscreen += 1;
        console.log(exit_full_screen);
        var key: string = "";
        $(document).keydown(function (e) {
          key = e.key;
        });
        html2canvas(document.body).then(function (canvas: any) {
          var ScreenshotImage = {
            Filename: "",
            TimeStamp: "",
            Latitude: "",
            Longitude: "",
          };
          ScreenshotImage.Filename =
            "REG" +
            varCandidateAssessmentData.CandidateAssessmentData.RegistrationId +
            "_TheoryViolation_" +
            moment().format("YYYYMMDDhhmmss") +
            ".jpeg";
          ScreenshotImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
          ScreenshotImage.Latitude = lat as string;
          ScreenshotImage.Longitude = long as string;
          ImageArrayObj = {
            FileName: "",
            Image_Data: "",
          };
          ImageArrayObj.FileName = ScreenshotImage.Filename;
          ImageArrayObj.Image_Data = canvas.toDataURL("image/jpeg");
          EventImage = ImageArrayObj.FileName;
          Event_log("EXIT_FULLSCREEN", data, sec, index, key);
          //ImageArrayContent.ImageArray.push(ImageArrayObj);
          //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.ScreenshotImages.push(
            ScreenshotImage
          );
          WriteFileToFileSystem(
            fs,
            ImageArrayObj.FileName,
            ImageArrayObj.Image_Data
          );
        });
        if (fullscreen % 2 != 0) {
          $.ajax({
            url: environment.Violation_Api,
            type: 'POST',
            dataType: 'json',
            data: {
              ApiKey: environment.api_key,
              CandidateId:varCandidateAssessmentData.CandidateAssessmentData.CandidateId,
              RequestId:varCandidateAssessmentData.CandidateAssessmentData.AssessmentRequestId,
              ViolationCode:'APP_SWITCHING'
            },
            success: function (data) {
              console.log(data);
            }
          });
          if (exit_full_screen > 4) {
            exit_full_screen = 0;
          }
          exit_full_screen += 1;
          $("#popup").css({
            opacity: 1,
          });
          if (exit_full_screen == 4) {
            document.getElementById("message").innerHTML =
              "<h1>" +
              "You cannot leave Full Screen Mode<br><br>You have no attempts left<br>" +
              "</h1>";
          } else if (exit_full_screen < 4) {
            document.getElementById("message").innerHTML =
              "<h1>" +
              "You cannot leave Full Screen Mode<br><br>You only have " +
              (4 - exit_full_screen) +
              " chances left<br>" +
              "</h1>";
          }
          $(".fullscreen-container").fadeTo(200, 1);
          $("#ok").click(function () {
            if (exit_full_screen < 4) {
              $("#popup").css({
                opacity: 0,
              });
              $(".fullscreen-container").fadeOut(200);
              var docElm = document.documentElement;
              $(document).ready(function () {
                if (docElm.requestFullscreen) {
                  docElm.requestFullscreen();
                }
              });
            } else if (exit_full_screen >= 4) {
              $("#popup").css({
                opacity: 1,
                display: "block",
              });
              document.getElementById("message").innerHTML =
                "<h1>" + "You have violated the rules<br>" + "</h1>";
              $(".fullscreen-container").fadeTo(200, 1);
              $("#ok").click(function () {
                exit_full_screen = 0;
                fullscreen = 0;
                route.navigate(["login"]);
              });
            }
          });
        }
      })
    );

    //screenshot for every 30 sec
    id1 = setInterval(() => {
      html2canvas(document.body).then(function (canvas: any) {
        var ScreenshotImage = {
          Filename: "",
          TimeStamp: "",
          Latitude: "",
          Longitude: "",
        };
        ScreenshotImage.Filename =
          "REG" +
          varCandidateAssessmentData.CandidateAssessmentData.RegistrationId +
          "_TheoryScreenShot_" +
          moment().format("YYYYMMDDhhmmss") +
          ".jpeg";
        ScreenshotImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
        ScreenshotImage.Latitude = lat as string;
        ScreenshotImage.Longitude = long as string;
        ImageArrayObj = {
          FileName: "",
          Image_Data: "",
        };
        ImageArrayObj.FileName = ScreenshotImage.Filename;
        ImageArrayObj.Image_Data = canvas.toDataURL("image/jpeg");
        //ImageArrayContent.ImageArray.push(ImageArrayObj);
        //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.ScreenshotImages.push(
          ScreenshotImage
        );
        WriteFileToFileSystem(
          fs,
          ImageArrayObj.FileName,
          ImageArrayObj.Image_Data
        );
      });
    }, 30000);
    //let classify = this.classifyImage;

    //snapshot for every 30 sec
    navigator.getUserMedia(
      constraints,
      function (stream) {
        var video = <HTMLVideoElement>document.getElementById("video");
        video.srcObject = stream;
        localstream = stream;
        //classify(video);
        id2 = setInterval(() => {
          var canvas_vid = <HTMLCanvasElement>document.getElementById("canvas");
          canvas_vid.width = video.videoWidth;
          canvas_vid.height = video.videoHeight;
          canvas_vid.getContext("2d").drawImage(video, 0, 0);
          var varcanvas = canvas_vid.toDataURL("image/jpeg");
          if (video.srcObject != null) {
            var SnapshotImage = {
              Filename: "",
              TimeStamp: "",
              Latitude: "",
              Longitude: "",
            };
            SnapshotImage.Filename =
              "REG" +
              varCandidateAssessmentData.CandidateAssessmentData
                .RegistrationId +
              "_TheorySnapShot_" +
              moment().format("YYYYMMDDhhmmss") +
              ".jpeg";
            SnapshotImage.TimeStamp = moment().format("DD-MMM-YYYY h:mm:ss a");
            SnapshotImage.Latitude = lat as string;
            SnapshotImage.Longitude = long as string;
            ImageArrayObj = {
              FileName: "",
              Image_Data: "",
            };
            ImageArrayObj.FileName = SnapshotImage.Filename;
            ImageArrayObj.Image_Data = varcanvas;
            //ImageArrayContent.ImageArray.push(ImageArrayObj);
            //localStorage.setItem('Image_Array', JSON.stringify(ImageArrayContent));
            varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.SnapshotImages.push(
              SnapshotImage
            );
            WriteFileToFileSystem(
              fs,
              ImageArrayObj.FileName,
              ImageArrayObj.Image_Data
            );
          }
        }, 30000);
      },
      function (err) {
        alert("there was an error: " + err);
        route.navigate(["login"]);
      }
    );
  }

  initial() {
    var varCandidateAssessmentData = this.data;
    $("input[name=groupOfDefaultRadios]").prop("checked", false);
    var ImageArrayContent = JSON.parse(localStorage.getItem("Image_Array"));
    var data = this.data;
    index = 0;
    /*if (
      parseInt(
        data.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex
      ) == 0
    )  
    else
      index = parseInt(
        data.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex
      );*/
    $(document).ready(function () {
      /*data.CandidateAssessmentData.TheoryAssessment.CurrentSectionIndex = sec;
      data.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex = index;
      localStorage.setItem('current_question_no', JSON.stringify(count));
      if (localStorage.getItem('current_question_no'))
        count = parseInt(localStorage.getItem('current_question_no'));*/
      document.getElementById("question").innerHTML =
        count +
        ". " +
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].QuestionTextList[0];
      document.getElementById("opt1").innerHTML =
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].Options[0].OptionTextList[0];
      document.getElementById("opt2").innerHTML =
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].Options[1].OptionTextList[0];
      document.getElementById("opt3").innerHTML =
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].Options[2].OptionTextList[0];
      document.getElementById("opt4").innerHTML =
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].Options[3].OptionTextList[0];
      if (sec != 0) {
        var key: string = "";
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log(
          "NEXT_BUTTON_CLICKED",
          varCandidateAssessmentData,
          sec,
          index,
          key
        );
      }
      if (id > 0 && sec != 0) {
        document.getElementById("question").innerHTML +=
          "<br/>" +
          "    " +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[id] +
          "</font>";
        document.getElementById("opt1").innerHTML +=
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[id] +
          "</font>";
        document.getElementById("opt2").innerHTML +=
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[id] +
          "</font>";
        document.getElementById("opt3").innerHTML +=
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[id] +
          "</font>";
        document.getElementById("opt4").innerHTML +=
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[id] +
          "</font>";
      }
    });

    $(document).ready(function () {
      $("#dropdown").change(function () {
        if (id == 0) {
          option = $("option:selected").attr("id");
          if (option == "Hindi") id = 1;
          else if (option == "Tamil") id = 2;
          else if (option == "Telugu") id = 3;
          else if (option == "Kannada") id = 4;
          else if (option == "Gujarati") id = 5;
          else if (option == "Oriya") id = 6;
          else if (option == "Assamese") id = 7;
          else if (option == "Urdu") id = 8;
          else if (option == "Marathi") id = 9;
          else if (option == "Malayalam") id = 10;
          else if (option == "Bengali") id = 11;
          else if (option == "Punjabi") id = 12;
          else if (option == "Manipuri") id = 13;
          else id = 0;
          if (id == 0) {
            document.getElementById("question").innerHTML =
              count +
              ". " +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id];
            document.getElementById("opt1").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[0].OptionTextList[id];
            document.getElementById("opt2").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[1].OptionTextList[id];
            document.getElementById("opt3").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[2].OptionTextList[id];
            document.getElementById("opt4").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[3].OptionTextList[id];
          } else if (id != 0) {
            document.getElementById("question").innerHTML +=
              "<br/>" +
              "    " +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id] +
              "</font>";
            document.getElementById("opt1").innerHTML +=
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[0].OptionTextList[id] +
              "</font>";
            document.getElementById("opt2").innerHTML +=
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[1].OptionTextList[id] +
              "</font>";
            document.getElementById("opt3").innerHTML +=
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[2].OptionTextList[id] +
              "</font>";
            document.getElementById("opt4").innerHTML +=
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[3].OptionTextList[id] +
              "</font>";
          }
        } else if (id > 0) {
          option = $("option:selected").attr("id");
          if (option == "Hindi") id = 1;
          else if (option == "Tamil") id = 2;
          else if (option == "Telugu") id = 3;
          else if (option == "Kannada") id = 4;
          else if (option == "Gujarati") id = 5;
          else if (option == "Oriya") id = 6;
          else if (option == "Assamese") id = 7;
          else if (option == "Urdu") id = 8;
          else if (option == "Marathi") id = 9;
          else if (option == "Malayalam") id = 10;
          else if (option == "Bengali") id = 11;
          else if (option == "Punjabi") id = 12;
          else if (option == "Manipuri") id = 13;
          else id = 0;
          if (id == 0) {
            document.getElementById("question").innerHTML =
              count +
              ". " +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id];
            document.getElementById("opt1").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[0].OptionTextList[id];
            document.getElementById("opt2").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[1].OptionTextList[id];
            document.getElementById("opt3").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[2].OptionTextList[id];
            document.getElementById("opt4").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[
                sec
              ].Questions[index].Options[3].OptionTextList[id];
          } else if (id != 0) {
            document.getElementById("question").innerHTML =
              count +
              ". " +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].QuestionTextList[0] +
              "<br/>" +
              "     " +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].QuestionTextList[id] +
              "</font>";
            document.getElementById("opt1").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[0].OptionTextList[0] +
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[0].OptionTextList[id] +
              "</font>";
            document.getElementById("opt2").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[1].OptionTextList[0] +
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[1].OptionTextList[id] +
              "</font>";
            document.getElementById("opt3").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[2].OptionTextList[0] +
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[2].OptionTextList[id] +
              "</font>";
            document.getElementById("opt4").innerHTML =
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[3].OptionTextList[0] +
              "<br/>" +
              '<font color="maroon" size="4">' +
              data.CandidateAssessmentData.TheoryAssessment.Sections[sec]
                .Questions[index].Options[3].OptionTextList[id] +
              "</font>";
          }
        }
      });
    });

    if (
      parseInt(
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].CandidateCurrentResponseOption
      ) != -1
    ) {
      var option =
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].CandidateCurrentResponseOption;
      if (option == "0") $("#Group1").prop("checked", true);
      if (option == "1") $("#Group2").prop("checked", true);
      if (option == "2") $("#Group3").prop("checked", true);
      if (option == "3") $("#Group4").prop("checked", true);
    }
    var sections = "sec" + (sec + 1) + "_" + (index + 1);
    if (document.getElementById(sections).className == "btn btn-warning px-3")
      $("#checkbox").prop("checked", true);
    else $("#checkbox").prop("checked", false);

    $("#img").css("display", "none");
    $("#img1").css("display", "none");
    $("#img2").css("display", "none");
    $("#img3").css("display", "none");
    $("#img4").css("display", "none");
    $(function () {
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[0].OptionImageFileName != ""
      ) {
        var link1: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[0].OptionImageFileName;
        var link2: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[1].OptionImageFileName;
        var link3: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[2].OptionImageFileName;
        var link4: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[3].OptionImageFileName;
        $("#img1").attr("src", link1);
        $("#img2").attr("src", link2);
        $("#img3").attr("src", link3);
        $("#img4").attr("src", link4);

        $("#img1").css("display", "block");
        $("#img2").css("display", "block");
        $("#img3").css("display", "block");
        $("#img4").css("display", "block");
      }
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].QuestionImageFileName != ""
      ) {
        var link: string =
          environment.Question_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].QuestionImageFileName;

        $("#img").attr("src", link);
        $("#img").css("display", "block");
      }
      $("img").click(function () {
        $("#myModal").css("display", "block");
        let id = this.id;
        let src = document.getElementById(id).getAttribute("src");
        $("#img01").attr("src", src);
      });
      var span = <HTMLSpanElement>document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        $("#myModal").css("display", "none");
      };
    });
  }
  next() {
    $("input[name=groupOfDefaultRadios]").prop("checked", false);
    var data = this.data;
    index += 1;
    count += 1;
    if (
      index <
      data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions
        .length
    ) {
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "NEXT_BUTTON_CLICKED",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
      $("#previous").removeAttr("disabled");
      /*data.CandidateAssessmentData.TheoryAssessment.CurrentSectionIndex = sec;
      data.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex = index;
      localStorage.setItem('current_question_no', JSON.stringify(count));*/
      if (id > 0) {
        document.getElementById("question").innerHTML =
          count +
          ". " +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[0] +
          "<br/>" +
          "      " +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[id] +
          "</font>";
        document.getElementById("opt1").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[id] +
          "</font>";
        document.getElementById("opt2").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[id] +
          "</font>";
        document.getElementById("opt3").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[id] +
          "</font>";
        document.getElementById("opt4").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[id] +
          "</font>";
      } else if (id == 0) {
        document.getElementById("question").innerHTML =
          count +
          ". " +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[0];
        document.getElementById("opt1").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[0];
        document.getElementById("opt2").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[0];
        document.getElementById("opt3").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[0];
        document.getElementById("opt4").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[0];
      }
      if (
        sec + 1 ==
          data.CandidateAssessmentData.TheoryAssessment.Sections.length &&
        index + 1 ==
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions
            .length
      ) {
        console.log(sec + 1, index + 1);
        $("#next").attr("disabled", "disabled");
      }
    } else {
      sec += 1;
      if (sec < data.CandidateAssessmentData.TheoryAssessment.Sections.length) {
        /*var key: string = '';
        $(document).keydown(function (e) {
          key = e.key;
        });
        Event_log(
          'NEXT_BUTTON_CLICKED',
          varCandidateAssessmentData,
          sec,
          index,
          key
        );*/
        this.initial();
      }
    }

    $(document).ready(function () {
      $("#dropdown").change(function () {
        option = $("option:selected").attr("id");
        if (option == "Hindi") id = 1;
        else if (option == "Tamil") id = 2;
        else if (option == "Telugu") id = 3;
        else if (option == "Kannada") id = 4;
        else if (option == "Gujarati") id = 5;
        else if (option == "Oriya") id = 6;
        else if (option == "Assamese") id = 7;
        else if (option == "Urdu") id = 8;
        else if (option == "Marathi") id = 9;
        else if (option == "Malayalam") id = 10;
        else if (option == "Bengali") id = 11;
        else if (option == "Punjabi") id = 12;
        else if (option == "Manipuri") id = 13;
        else id = 0;
      });
    });

    if (
      parseInt(
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].CandidateCurrentResponseOption
      ) != -1
    ) {
      var option =
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].CandidateCurrentResponseOption;
      if (option == "0") $("#Group1").prop("checked", true);
      if (option == "1") $("#Group2").prop("checked", true);
      if (option == "2") $("#Group3").prop("checked", true);
      if (option == "3") $("#Group4").prop("checked", true);
    }
    var sections = "sec" + (sec + 1) + "_" + (index + 1);
    if (document.getElementById(sections).className == "btn btn-warning px-3")
      $("#checkbox").prop("checked", true);
    else $("#checkbox").prop("checked", false);

    $("#img").css("display", "none");
    $("#img1").css("display", "none");
    $("#img2").css("display", "none");
    $("#img3").css("display", "none");
    $("#img4").css("display", "none");
    $(function () {
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[0].OptionImageFileName != ""
      ) {
        var link1: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[0].OptionImageFileName;
        var link2: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[1].OptionImageFileName;
        var link3: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[2].OptionImageFileName;
        var link4: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[3].OptionImageFileName;
        $("#img1").attr("src", link1);
        $("#img2").attr("src", link2);
        $("#img3").attr("src", link3);
        $("#img4").attr("src", link4);

        $("#img1").css("display", "block");
        $("#img2").css("display", "block");
        $("#img3").css("display", "block");
        $("#img4").css("display", "block");
      }
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].QuestionImageFileName != ""
      ) {
        var link: string =
          environment.Question_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].QuestionImageFileName;
        $("#img").attr("src", link);
        $("#img").css("display", "block");
      }
      $("img").click(function () {
        $("#myModal").css("display", "block");
        let id = this.id;
        let src = document.getElementById(id).getAttribute("src");
        $("#img01").attr("src", src);
      });
      var span = <HTMLSpanElement>document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        $("#myModal").css("display", "none");
      };
    });
  }
  previous() {
    $("input[name=groupOfDefaultRadios]").prop("checked", false);
    $("#next").removeAttr("disabled");
    var data = this.data;

    if (index != 0) {
      index -= 1;
      count -= 1;
    } else if (index == 0) {
      if (sec != 0) sec -= 1;
      if (sec >= 0) {
        index =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions
            .length - 1;
        count -= 1;
      }
    }
    if (index >= 0) {
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "PREVIOUS_BUTTON_CLICKED",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
      /*data.CandidateAssessmentData.TheoryAssessment.CurrentSectionIndex = sec;
      data.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex = index;
      localStorage.setItem('current_question_no', JSON.stringify(count));*/
      if (
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].CandidateCurrentResponseOption != -1
      ) {
        var option =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].CandidateCurrentResponseOption;
        if (option == "0") $("#Group1").prop("checked", true);
        if (option == "1") $("#Group2").prop("checked", true);
        if (option == "2") $("#Group3").prop("checked", true);
        if (option == "3") $("#Group4").prop("checked", true);
      }
      if (id > 0) {
        document.getElementById("question").innerHTML =
          count +
          ". " +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[0] +
          "<br/>" +
          "     " +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[id] +
          "</font>";
        document.getElementById("opt1").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[id] +
          "</font>";
        document.getElementById("opt2").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[id] +
          "</font>";
        document.getElementById("opt3").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[id] +
          "</font>";
        document.getElementById("opt4").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[id] +
          "</font>";
      } else if (id == 0) {
        document.getElementById("question").innerHTML =
          count +
          ". " +
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].QuestionTextList[0];
        document.getElementById("opt1").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[0].OptionTextList[0];
        document.getElementById("opt2").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[1].OptionTextList[0];
        document.getElementById("opt3").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[2].OptionTextList[0];
        document.getElementById("opt4").innerHTML =
          data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
            index
          ].Options[3].OptionTextList[0];
      }
      if (sec == 0 && index == 0) {
        $("#previous").attr("disabled", "disabled");
      }
    }

    $(function () {
      $("#dropdown").change(function () {
        option = $("option:selected").attr("id");
        if (option == "Hindi") id = 1;
        else if (option == "Tamil") id = 2;
        else if (option == "Telugu") id = 3;
        else if (option == "Kannada") id = 4;
        else if (option == "Gujarati") id = 5;
        else if (option == "Oriya") id = 6;
        else if (option == "Assamese") id = 7;
        else if (option == "Urdu") id = 8;
        else if (option == "Marathi") id = 9;
        else if (option == "Malayalam") id = 10;
        else if (option == "Bengali") id = 11;
        else if (option == "Punjabi") id = 12;
        else if (option == "Manipuri") id = 13;
        else id = 0;
      });
    });

    if (
      parseInt(
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].CandidateCurrentResponseOption
      ) != -1
    ) {
      var option =
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].CandidateCurrentResponseOption;
      if (option == "0") $("#Group1").prop("checked", true);
      if (option == "1") $("#Group2").prop("checked", true);
      if (option == "2") $("#Group3").prop("checked", true);
      if (option == "3") $("#Group4").prop("checked", true);
    }
    var sections = "sec" + (sec + 1) + "_" + (index + 1);
    if (document.getElementById(sections).className == "btn btn-warning px-3")
      $("#checkbox").prop("checked", true);
    else $("#checkbox").prop("checked", false);

    $("#img").css("display", "none");
    $("#img1").css("display", "none");
    $("#img2").css("display", "none");
    $("#img3").css("display", "none");
    $("#img4").css("display", "none");

    if (
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
        .Sections[sec].Questions[index].Options[0].OptionImageFileName != ""
    ) {
      var link1: string =
        environment.Option_Image_URL +
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[0].OptionImageFileName;
      var link2: string =
        environment.Option_Image_URL +
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[1].OptionImageFileName;
      var link3: string =
        environment.Option_Image_URL +
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[2].OptionImageFileName;
      var link4: string =
        environment.Option_Image_URL +
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[3].OptionImageFileName;
      $("#img1").attr("src", link1);
      $("#img2").attr("src", link2);
      $("#img3").attr("src", link3);
      $("#img4").attr("src", link4);

      $("#img1").css("display", "block");
      $("#img2").css("display", "block");
      $("#img3").css("display", "block");
      $("#img4").css("display", "block");
    }
    if (
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
        .Sections[sec].Questions[index].QuestionImageFileName != ""
    ) {
      var link: string =
        environment.Question_Image_URL +
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].QuestionImageFileName;
      $("#img").attr("src", link);
      $("#img").css("display", "block");
    }
    $("img").click(function () {
      $("#myModal").css("display", "block");
      let id = this.id;
      let src = document.getElementById(id).getAttribute("src");
      $("#img01").attr("src", src);
    });
    var span = <HTMLSpanElement>document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      $("#myModal").css("display", "none");
    };
  }

  clicked(section: any, ind: any, question: any) {
    $(function () {
      var no1 =
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections.length;
      var no2 =
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[no1 - 1].Questions.length;
      no1 = no1.toString();
      no2 = no2.toString();
      /*varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.CurrentSectionIndex = section;
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex = index;
      localStorage.setItem('current_question_no', JSON.stringify(question));*/
      var sections = section + "_" + ind;
      if (document.getElementById(sections).className == "btn btn-warning px-3")
        $("#checkbox").prop("checked", true);
      else $("#checkbox").prop("checked", false);
      $("input[name=groupOfDefaultRadios]").prop("checked", false);
      $("#next").removeAttr("disabled");
      $("#previous").removeAttr("disabled");
      if (section == "sec1" && ind == "1")
        $("#previous").attr("disabled", "disabled");
      if (section == "sec" + no1 && ind == no2)
        $("#next").attr("disabled", "disabled");
      count = parseInt(question);
      index = parseInt(ind) - 1;
      var sec_split = section.split("c");
      sec = parseInt(sec_split[1]) - 1;
      if (id == 0) {
        document.getElementById("question").innerHTML =
          question +
          ". " +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].QuestionTextList[0];
        document.getElementById("opt1").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
            sec
          ].Questions[index].Options[0].OptionTextList[0];
        document.getElementById("opt2").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
            sec
          ].Questions[index].Options[1].OptionTextList[0];
        document.getElementById("opt3").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
            sec
          ].Questions[index].Options[2].OptionTextList[0];
        document.getElementById("opt4").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.Sections[
            sec
          ].Questions[index].Options[3].OptionTextList[0];
      } else if (id != 0) {
        document.getElementById("question").innerHTML =
          question +
          ". " +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].QuestionTextList[0] +
          "<br/>" +
          "      " +
          '<font color="maroon" size="4">' +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].QuestionTextList[id] +
          "</font>";
        document.getElementById("opt1").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[0].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[0].OptionTextList[id] +
          "</font>";
        document.getElementById("opt2").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[1].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[1].OptionTextList[id] +
          "</font>";
        document.getElementById("opt3").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[2].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[2].OptionTextList[id] +
          "</font>";
        document.getElementById("opt4").innerHTML =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[3].OptionTextList[0] +
          "<br/>" +
          '<font color="maroon" size="4">' +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[3].OptionTextList[id] +
          "</font>";
      }
      console.log(sec, index);
      if (
        parseInt(
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].CandidateCurrentResponseOption
        ) != -1
      ) {
        var option =
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].CandidateCurrentResponseOption;
        if (option == "0") $("#Group1").prop("checked", true);
        if (option == "1") $("#Group2").prop("checked", true);
        if (option == "2") $("#Group3").prop("checked", true);
        if (option == "3") $("#Group4").prop("checked", true);
      }
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "QUESTION_LINK_CLICKED",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
      $("#img").css("display", "none");
      $("#img1").css("display", "none");
      $("#img2").css("display", "none");
      $("#img3").css("display", "none");
      $("#img4").css("display", "none");
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].Options[0].OptionImageFileName != ""
      ) {
        var link1: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[0].OptionImageFileName;
        var link2: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[1].OptionImageFileName;
        var link3: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[2].OptionImageFileName;
        var link4: string =
          environment.Option_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].Options[3].OptionImageFileName;
        $("#img1").attr("src", link1);
        $("#img2").attr("src", link2);
        $("#img3").attr("src", link3);
        $("#img4").attr("src", link4);

        $("#img1").css("display", "block");
        $("#img2").css("display", "block");
        $("#img3").css("display", "block");
        $("#img4").css("display", "block");
      }
      if (
        varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
          .Sections[sec].Questions[index].QuestionImageFileName != ""
      ) {
        var link: string =
          environment.Question_Image_URL +
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].QuestionImageFileName;
        $("#img").attr("src", link);
        $("#img").css("display", "block");
      }
      $("img").click(function () {
        $("#myModal").css("display", "block");
        let id = this.id;
        let src = document.getElementById(id).getAttribute("src");
        $("#img01").attr("src", src);
      });
      var span = <HTMLSpanElement>document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        $("#myModal").css("display", "none");
      };
    });
  }
  marked() {
    var section = "sec" + (sec + 1) + "_" + (index + 1);
    if ($("#checkbox").is(":checked")) {
      marked_review += 1;
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "QUESTION_MARKED_FOR_REVIEW",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
      document.getElementById(section).className = "btn btn-warning px-3";
    } else {
      document.getElementById(section).classList.remove("btn-warning");
      var key: string = "";
      $(document).keydown(function (e) {
        key = e.key;
      });
      Event_log(
        "QUESTION_UNMARKED_FOR_REVIEW",
        varCandidateAssessmentData,
        sec,
        index,
        key
      );
      if (
        parseInt(
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[sec].Questions[index].CandidateCurrentResponseOption
        ) != -1
      ) {
        document.getElementById(section).className = "btn btn-success px-3";
        marked_review -= 1;
      } else {
        document.getElementById(section).className = "btn btn-danger px-3";
        marked_review -= 1;
      }
    }
  }

  /*var var= GetNotifySecondArray(960);

  function GetNotifySecondArray(varSeconds)
  {
    var varNotifySecondArray = [];
    for (var iCounter = RemainingSeconds; iCounter >= 0; i--)
      varNotifySecondArray.push(i);
    return varNotifySecondArray;
  }*/

  timeup(event: any) {
    varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.RemainingDurationSeconds =
      (event.left as number) / 1000;
    localStorage.setItem(
      localStorage.getItem("req_id") +
        "_" +
        localStorage.getItem("cand_id") +
        "_" +
        "data",
      JSON.stringify(varCandidateAssessmentData)
    );
    if (event.action == "done") {
      timer = true;
      if (id1) {
        clearInterval(id1);
      }
      if (id2) {
        clearInterval(id2);
      }
      if (id3) {
        clearInterval(id3);
      }
      if (id5) {
        clearInterval(id5);
      }
      if (localstream) localstream.getTracks()[0].stop();
      $("body").off();
      document.removeEventListener("fullscreenchange", full_screen);
      document.removeEventListener("contextmenu", id4);
      document.removeEventListener("visibilitychange", visibility);
      $("#submit_reponse_btn").click();
    }
  }

  submit() {
    let total_question = 0;
    $.each(
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
        .Sections,
      function (index, value) {
        total_question +=
          varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
            .Sections[index].Questions.length;
      }
    );
    $(document).ready(function () {
      if (timer) {
        document.getElementById("1").innerHTML =
          "<h2 style='color:red'>TIME UP</h2><br>" +
          "<h2>Total questions : " +
          total_question +
          " questions <br></h2>" +
          "<h2>Attempted questions : " +
          attempted_count +
          " questions <br></h2>" +
          "<h2>Unattempted questions : " +
          (total_question - attempted_count) +
          " questions <br></h2>" +
          "<h2> Marked for Review : " +
          marked_review +
          " questions<br></h2>";
        $("#no").attr("disabled", "disabled");
      } else {
        document.getElementById("1").innerHTML =
          "<h2>Total questions : " +
          total_question +
          " questions <br></h2>" +
          "<h2>Attempted questions : " +
          attempted_count +
          " questions <br></h2>" +
          "<h2>Unattempted questions : " +
          (total_question - attempted_count) +
          " questions <br></h2>" +
          "<h2> Marked for Review : " +
          marked_review +
          " questions<br></h2>";
      }
    });
  }

  yes() {
    varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.AssessmentStatus = 2;
    if (
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment
        .AssessmentFinishDateTime == ""
    )
      varCandidateAssessmentData.CandidateAssessmentData.TheoryAssessment.AssessmentFinishDateTime = moment().format(
        "DD-MMM-YYYY h:mm:ss a"
      );
    var key: string = "";
    $(document).keydown(function (e) {
      key = e.key;
    });
    Event_log(
      "ASSESSMENT_FINISHED",
      varCandidateAssessmentData,
      sec,
      index,
      key
    );
    varCandidateAssessmentData = localStorage.getItem(
      this.Req + "_" + this.Id + "_" + "data"
    );
    localStorage.setItem("Response_data", varCandidateAssessmentData);
    this.route.navigate(["end-image-capture"]);
  }
  ngOnDestroy() {
    if (id1) {
      clearInterval(id1);
    }
    if (id2) {
      clearInterval(id2);
    }
    if (id3) {
      clearInterval(id3);
    }
    if (id5) {
      clearInterval(id5);
    }
    if (localstream) localstream.getTracks()[0].stop();
    this.data.CandidateAssessmentData.TheoryAssessment.CurrentSectionIndex = sec;
    this.data.CandidateAssessmentData.TheoryAssessment.CurrentQuestionIndex = index;
    /*console.log(sec, index);
    localStorage.setItem(
      localStorage.getItem('req_id') +
        '_' +
        localStorage.getItem('cand_id') +
        '_' +
        'data',
      JSON.stringify(this.data)
    );*/
    $("body").off();
    document.removeEventListener("fullscreenchange", full_screen);
    document.removeEventListener("contextmenu", id4);
    document.removeEventListener("keydown", visibility);
  }
}

function WriteFileToFileSystem(varFs: any, fileName: any, fileContent: any) {
  varFs.root.getFile(
    "/" + fileName,
    { create: true },
    function (fileEntry: any) {
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter: any) {
        fileWriter.onwriteend = function (e: any) {
          console.log("Write completed.");
        };

        fileWriter.onerror = function (e: any) {
          console.log("Write failed: " + e.toString());
        };

        var blob = new Blob([fileContent], { type: "text/plain" });

        fileWriter.write(blob);
      }, errorHandler);
    },
    errorHandler
  );
}
function errorHandler(err: any) {
  console.log(err);
}

function Event_log(
  events: string,
  data: any,
  sec: number,
  index: number,
  key: string
) {
  let lat = localStorage.getItem("lat");
  let long = localStorage.getItem("long");
  var Assessment_event = {
    DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
    SubTypeId: 0,
    SectionIndex: sec,
    QuestionIndex: index,
    ActualResponse: -1,
    KeyboardKey: key,
    Description: "",
    EventImage: "",
    Latitude: lat,
    Longitude: long,
  };
  switch (events) {
    case "ASSESSMENT_STARTED":
      Assessment_event.SubTypeId = 1;
      Assessment_event.Description = "Candidate has started the assessment";
      break;
    case "ASSESSMENT_CONTINUED":
      Assessment_event.SubTypeId = 2;
      Assessment_event.Description = "Candidate has continued the assessment";
      break;
    case "ASSESSMENT_FINISHED":
      Assessment_event.SubTypeId = 3;
      Assessment_event.Description = "Candidate has finished the assessment";
      break;
    case "ASSESSMENT_DATA_UPLOAD_FAILED":
      Assessment_event.SubTypeId = 4;
      Assessment_event.Description = "Upload failed";
      break;
    case "ASSESSMENT_DATA_UPLOADED":
      Assessment_event.SubTypeId = 5;
      Assessment_event.Description = "Upload successful";
      break;
    case "ASSESSMENT_SUBMITTED":
      Assessment_event.SubTypeId = 7;
      Assessment_event.Description = "Assessment Submitted";
      break;
    case "QUESTION_LINK_CLICKED":
      Assessment_event.SubTypeId = 12;
      Assessment_event.Description = "Candidate has clicked question link";
      break;
    case "PREVIOUS_BUTTON_CLICKED":
      Assessment_event.SubTypeId = 13;
      Assessment_event.Description = "Candidate has clicked previous button";
      break;
    case "NEXT_BUTTON_CLICKED":
      Assessment_event.SubTypeId = 14;
      Assessment_event.Description = "Candidate has clicked next button";
      break;
    case "QUESTION_LANGUAGE_CHANGED":
      Assessment_event.SubTypeId = 15;
      Assessment_event.Description = "Candidate has changed the language";
      break;
    case "QUESTION_MARKED_FOR_REVIEW":
      Assessment_event.SubTypeId = 17;
      Assessment_event.Description =
        "Candidate has marked the question for review";
      break;
    case "QUESTION_UNMARKED_FOR_REVIEW":
      Assessment_event.SubTypeId = 18;
      Assessment_event.Description = "Candidate has unmarked the review";
      break;
    case "OPTION_SELECTED":
      Assessment_event.SubTypeId = 21;
      Assessment_event.ActualResponse = parseInt(
        data.CandidateAssessmentData.TheoryAssessment.Sections[sec].Questions[
          index
        ].CandidateCurrentResponseOption
      );
      Assessment_event.Description = "Candidate has selected the option";
      break;
    case "KEYBOARD_KEY_PRESSED":
      Assessment_event.SubTypeId = 23;
      break;
    case "EXIT_FULLSCREEN":
      Assessment_event.SubTypeId = 25;
      Assessment_event.Description = "Candidate attempted to exit full screen";
      Assessment_event.EventImage = EventImage;
      break;
    case "TAB_SWITCH":
      Assessment_event.SubTypeId = 25;
      Assessment_event.Description = "Candidate attempted to switch tabs";
      Assessment_event.EventImage = EventImage;
      break;
  }
  data.CandidateAssessmentData.TheoryAssessment.AssessmentEvents.push(
    Assessment_event
  );
  var file =
    localStorage.getItem("req_id") +
    "_" +
    localStorage.getItem("cand_id") +
    "_" +
    "data";
  if (typeof data == "string") localStorage.setItem(file, JSON.stringify(data));
  else localStorage.setItem(file, JSON.stringify(data));
}
