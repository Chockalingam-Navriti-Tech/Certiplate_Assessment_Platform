import { Component, OnInit } from "@angular/core";
import {
  Router,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
} from "@angular/router";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { Location } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  username: any;
  constructor(private route: Router, private _location: Location) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("req_id");
  }

  back_function() {
    this.route.navigate(['proctor-count-views']);
  }

  clear() {
    $.ajax({
      url: environment.URL_logout_authentication,
      type: "POST",
      dataType: "json",
      data: {
        ApiKey: environment.ApiKey,
        UserId: localStorage.getItem("UserId"),
        SessionId: sessionStorage.getItem("SessionId"),
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        localStorage.setItem(
          json.LogoutResponseData.Message,
          JSON.stringify(data)
        );
        if (json.LogoutResponseData.Message == "User logged out") {
          sessionStorage.clear();
          this.route.navigate(["login"]);
        } else if (
          json.LogoutResponseData.Message == "User has already been logged out"
        ) {
          this.route.navigate(["login"]);
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
}
