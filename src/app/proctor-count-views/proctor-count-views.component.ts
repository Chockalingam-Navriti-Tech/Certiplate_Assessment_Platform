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
  constructor(private route: Router) {}
  dtOptions: any = {};
  userData: any;
  UserId: any;
  totalCount: any;
  ngOnInit(): void {
    this.UserId = sessionStorage.getItem("req_id");
    sessionStorage.setItem("previous_page", "proctor-count-views");
    const that = this;
    $.ajax({
      url: environment.Proctor_Count_Views_URL,
      type: "POST",
      dataType: "json",
      data: {
        apiKey: environment.Proctor_Count_Views_Api_Key,
        UserId: localStorage.getItem("UserId"),
        UserRoleId: localStorage.getItem("UserRoleId"),
      },
      success: function (data: any) {
        that.totalCount = 0;
        data = data.StatewiseProctorCountData.ProctorCountData;
        for (var i = 0; i < data.length; i++) {
          that.totalCount += parseInt(data[i].ProctorCount);
        }
        that.Render_DataTable();
      },
      error: function (err: any) {
        alert("Error :" + err);
      },
    });
  }
  Render_DataTable() {
    $(function () {
      var table = $("#myTable").DataTable({
        lengthMenu: [10, 15, 25, 50, 100],
        pageLength: 10,
        scrollY: "32vh",
        serverSide: false,
        scrollX: true,
        scrollCollapse: true,
        responsive: true,
        initComplete: function (settings, json) {
          json_data = json;
        },
        columnDefs: [
          { width: "10%", targets: 0 },
          { width: "60%", targets: 1 },
          { width: "30%", targets: 2 },
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
          dataSrc: "StatewiseProctorCountData.ProctorCountData",
          beforeSend: function () {
            $("#image").show();
          },
          complete: function () {
            $("#image").hide();
          },
        },
        columns: [
          { data: "StateId" },
          { data: "StateName" },
          {
            data: "ProctorCount",
            render: function (data: any, type: any, row: any, meta: any) {
              if (row.ProctorCount > 0) {
                var a =
                  '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/proctor-attributes" href="/proctor-attributes">' +
                  row.ProctorCount +
                  `</button>`;
                return a;
              } else {
                return data;
              }
            },
          },
          /*{
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
          }*/
        ],
      });
      table
        .on("order.dt search.dt", function () {
          table
            .column(0, { search: "applied", order: "applied" })
            .nodes()
            .each(function (cell: any, i: any) {
              cell.innerHTML = i + 1;
            });
        })
        .draw();
      table.columns.adjust().draw();
      $("#myTable").on("click", "tbody tr td", function () {
        var index = table.row(this).index();
        sessionStorage.setItem(
          "StateId",
          json_data.StatewiseProctorCountData.ProctorCountData[index].StateId
        );
      });
    });
  }

  clicked_total() {
    sessionStorage.setItem("StateId", "-1");
    this.route.navigate(["proctor-attributes"]);
  }
}
