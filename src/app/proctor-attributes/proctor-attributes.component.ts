import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { ExcelService } from "../service/excel.service";

var json_data: any;

@Component({
  selector: "app-proctor-attributes",
  templateUrl: "./proctor-attributes.component.html",
  styleUrls: ["./proctor-attributes.component.css"],
})
export class ProctorAttributesComponent implements OnInit {
  constructor(private route: Router, private excelService: ExcelService) {}
  chart: any;

  term: any;
  chartOptions = {};
  counter = 0;
  LangwiseData: any;
  ProctorData: any;
  data: any;
  lang_id: any;
  lang_name: any;
  proctor_count: any;

  page: number = 1;
  stateid = [];
  x_data = [];
  y_data = [];
  color_array = [
    "#28B7BB",
    "#61AE48",
    "#CB36D1",
    "#F5BB00",
    "#c45850",
    "#3e95cd",
    "#8e5ea2",
    "#3cba9f",
    "#e8c3b9",
    "#c45850",
  ];
  bgColor = [];
  chartdata = {};
  dtOptions: any = {};
  userData: any;
  UserId: any;

  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("req_id");
    sessionStorage.setItem("previous_page", "proctor-attributes");
    this.call_statewise_ajax();
  }
  call_statewise_ajax() {
    $.ajax({
      url: environment.Proctor_Statewise_Count_URL,
      type: "POST",
      dataType: "json",
      data: {
        ApiKey: environment.ApiKey,
        UserId: sessionStorage.getItem("UserId"),
        UserRoleId: sessionStorage.getItem("UserRoleId"),
        StateId: sessionStorage.getItem("StateId"),
      },

      beforeSend: function () {
        $("#image").show();
      },
      complete: function () {
        $("#image").hide();
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        let i = -1;
        if (json.LanguagewiseProctorCountData.StatusId == "1") {
          this.LangwiseData =
            json.LanguagewiseProctorCountData.ProctorCountData;
          for (var item in this.LangwiseData) {
            this.lang_id = this.LangwiseData[item].LanguageId;
            this.lang_name = this.LangwiseData[item].LanguageName;

            this.proctor_count = this.LangwiseData[item].ProctorCount;
            this.stateid.push(this.lang_id);
            //this.x_data.push(this.lang_name + '(' + this.lang_id + ')');
            this.x_data.push(this.lang_name);
            this.y_data.push(this.proctor_count);
            i++;
            this.bgColor.push(this.color_array[i]);
          }
          console.log(this.stateid);
          console.log(this.x_data);
          console.log(this.y_data);
          setTimeout(() => {
            this.state_chart(
              this.stateid,
              this.x_data,
              this.y_data,
              this.bgColor
            );
          }, 500);
          //this.stateData = json.AssessorCertificationDetailedData.StatewiseProctorData;
          //this.totalRecords = this.ProctorData.length
        }
      },
      error: function (err) {
        console.log("error:" + err);
      },
    });
  }

  state_chart(sid: any, xlabel: any, ydata: any, bgcolors: any) {
    const that = this;
    this.chart = new Chart("myChart", {
      type: "bar",
      options: {
        layout: {
          padding: {
            left: 40,
            right: 40,
            top: 20,
            bottom: 20,
          },
        },
        onClick: function (e: any, i: any) {
          e = i[0];
          sessionStorage.setItem("LanguageId", e._index + 1);
          $(".toggle1").css("display", "block");
          $(".toggle2").css("display", "block").slideUp("slow");
          that.proctor_details();
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                zeroLineColor: "white",
              },
              ticks: {
                beginAtZero: true,
                fontColor: "white",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: "white",
              },
              ticks: {
                fontColor: "white",
                fontStyle: "bold",
              },
            },
          ],
        },
        responsive: true,
        title: {
          display: true,
          text: " Languagewise Proctor Distribution",
          fontColor: "white",
          fontSize: 18,
        },
      },
      data: {
        labels: xlabel,
        datasets: [
          {
            type: "bar",
            data: ydata,
            backgroundColor: bgcolors,
            borderColor: bgcolors,
            maxBarThickness: 40,
            fill: true,
          },
        ],
      },
    });
  }

  scrolldown() {
    $(".toggle1").css("display", "none").slideDown("slow");
    $(".toggle2").show("slow");
  }

  proctor_details() {
    var table = $("#myTable").DataTable({
      destroy: true,
      lengthMenu: [10, 15, 25, 50, 100],
      pageLength: 10,
      scrollY: "30vh",
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

    $.ajax({
      url: environment.Proctor_Attributes_URL,
      type: "POST",
      dataType: "json",
      data: {
        apiKey: environment.Proctor_Attributes_Api_Key,
        UserId: sessionStorage.getItem("UserId"),
        UserRoleId: sessionStorage.getItem("UserRoleId"),
        StateId: sessionStorage.getItem("StateId"),
        LanguageId: sessionStorage.getItem("LanguageId"),
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        if (json.StateAndLanguagewiseProctorDetailedData.StatusId == "1") {
          this.ProctorData =
            json.StateAndLanguagewiseProctorDetailedData.ProctorData;
        }
      },
      error: function (err) {
        console.log("error:" + err);
      },
    });
  }

  download_file() {
    this.excelService.exportAsExcelFile(this.ProctorData, "proctor_data");
  }
}
