import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Component, OnInit } from "@angular/core";

var json_data: any;

@Component({
  selector: "app-proctor-attributes",
  templateUrl: "./proctor-attributes.component.html",
  styleUrls: ["./proctor-attributes.component.css"],
})
export class ProctorAttributesComponent implements OnInit {
  constructor(private route: Router) {}
  dtOptions: any = {};
  userData: any;
  UserId: any;
  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("req_id");
    sessionStorage.setItem("previous_page", "proctor-attributes");
    var table = $("#myTable").DataTable({
      lengthMenu: [10, 15, 25, 50, 100],
      pageLength: 10,
      scrollY: "49vh",
      serverSide: false,
      scrollX: true,
      scrollCollapse: true,
      responsive: true,
      order: [1, "asc"],
      initComplete: function (settings, json) {
        json_data = json;
      },
      columnDefs: [
        {
          targets: ["_all"],
          className: "mdc-data-table__cell",
        },
      ],
      ajax: {
        url: environment.Proctor_Attributes_URL,
        type: "POST",
        dataType: "json",
        data: {
          apiKey: environment.Proctor_Attributes_Api_Key,
          UserId: localStorage.getItem("UserId"),
          UserRoleId: localStorage.getItem("UserRoleId"),
          StateId: sessionStorage.getItem("StateId"),
          LanguageId: sessionStorage.getItem("LanguageId"),
        },
        dataSrc: "StateAndLanguagewiseProctorDetailedData.ProctorData",
        beforeSend: function () {
          $("#image").show();
        },
        complete: function () {
          $("#image").hide();
        },
      },
      columns: [
        { data: "FacilitatorId" },
        { data: "FacilitatorName" },
        { data: "FacilitatorEmail" },
        { data: "FacilitatorPhone" },
        { data: "FacilitatorAlternatePhone" },
        { data: "DateOfUpload" },
        { data: "District" },
        { data: "State" },
        { data: "AadhaarNumber" },
        { data: "PanNumber" },
        { data: "ProctorStatus" },
        { data: "CertificateFileName" },
        { data: "CertificateExpiryDate" },
        { data: "LanguagesKnown" },
        { data: "Source" },
        { data: "SourcedByUserName" },
        { data: "BankAccountNumber" },
        { data: "BankName" },
        { data: "IfscCode" },
        { data: "CancelledChequeFileName" },
        { data: "MouFileName" },
        { data: "FacilitatorImageFileName" },
        { data: "FacilitatorResumeFileName" },
        { data: "EducationCertificateFileName" },
        { data: "ExperienceCertificateFileName" },
        { data: "Status" },
      ],
    });
    /*$("#myTable").on("click", "tbody tr td", function () {
        var index1 = table.row(this).index();
        var index2 = table.column(this).index();
        sessionStorage.setItem(
          "StateId",
          json_data.StateAndLanguagewiseProctorCountData.ProctorCountData[
            index1
          ].StateId
        );
        sessionStorage.setItem("LanguageId", index2.toString());
      });*/
    const burger: any = document.querySelector(".burger");
    const nav: any = document.querySelector(".nav-links");
    const nav_items = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      nav_items.forEach((link: any, index) => {
        if (link.style.animation) link.style.animation = "";
        else {
          link.style.animation = `navlinkdesign 0.5s ease forwards ${
            index / 7 + 0.4
          }s`;
          nav.style.transition = `transform 0.5s ease-in`;
        }
      });
      burger.classList.toggle("toggle");
    });
  }
  back_button_clicked() {
    this.route.navigate(["proctor-count-views"]);
  }
}
