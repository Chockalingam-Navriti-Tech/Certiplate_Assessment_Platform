import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import "datatables.net";
import { MdbBtnDirective } from "angular-bootstrap-md";
import { resolve } from "path";
import { rejects } from "assert";

var json_data: any;
@Component({
  selector: "app-proctor-count-views",
  templateUrl: "./proctor-count-views.component.html",
  styleUrls: ["./proctor-count-views.component.css"],
})
export class ProctorCountViewsComponent implements OnInit {
  constructor() {}
  dtOptions: any = {};
  userData: any;
  UserId: any;
  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("req_id");
    sessionStorage.setItem("previous_page", "proctor-count-views");
    $(function () {
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
          url: environment.Proctor_Count_Views_URL,
          type: "POST",
          dataType: "json",
          data: {
            apiKey: environment.Proctor_Count_Views_Api_Key,
            UserId: localStorage.getItem("UserId"),
            UserRoleId: localStorage.getItem("UserRoleId"),
          },
          dataSrc: "StateAndLanguagewiseProctorCountData.ProctorCountData",
          beforeSend: function () {
            $("#image").show();
          },
          complete: function () {
            $("#image").hide();
          },
        },
        columns: [
          { data: "StateName" },
          {
            data: "EnglishCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.EnglishCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.EnglishCount +
                  `</button>`;
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "HindiCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.HindiCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.HindiCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "TamilCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.TamilCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.TamilCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "TeluguCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.TeluguCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.TeluguCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "KannadaCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.KannadaCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.KannadaCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "GujaratiCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.GujaratiCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.GujaratiCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "OriyaCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.OriyaCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.OriyaCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "AssameseCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.AssameseCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.AssameseCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "UrduCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.UrduCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.UrduCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "MarathiCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.MarathiCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.MarathiCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "MalayalamCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.MalayalamCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.MalayalamCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "BengaliCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.BengaliCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.BengaliCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "PunjabiCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.PunjabiCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.PunjabiCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "ManipuriCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.ManipuriCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.ManipuriCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "TotalCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.TotalCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.TotalCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
          {
            data: "DistinctTotalCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.DistinctTotalCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.DistinctTotalCount +
                  "</a>";
                return a;
              } else {
                return data;
              }
            },
          },
        ],
      });
      $("#myTable").on("click", "tbody tr td", function () {
        var index1 = table.row(this).index();
        var index2 = table.column(this).index();
        sessionStorage.setItem(
          "StateId",
          json_data.StateAndLanguagewiseProctorCountData.ProctorCountData[
            index1
          ].StateId
        );
        if (index2 > 14) sessionStorage.setItem("LanguageId", "0");
        else sessionStorage.setItem("LanguageId", index2.toString());
      });
    });
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
}
