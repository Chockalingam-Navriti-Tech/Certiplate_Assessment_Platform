import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-proctor-count-views',
  templateUrl: './proctor-count-views.component.html',
  styleUrls: ['./proctor-count-views.component.css'],
})
export class ProctorCountViewsComponent implements OnInit {
  constructor() {}
  dtOptions: any = {};
  userData: any;
  UserId: any;
  ngOnInit(): void {
    this.UserId = sessionStorage.getItem('req_id');
    this.dtOptions = {
      aLengthMenu: [10, 15],
      pageLength: 10,
      scrollY: '48vh',
      serverSide: false,
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 1,
      },
      responsive: true,
      order: [1, 'asc'],
      columnDefs: [
        {
          targets: ['_all'],
          className: 'mdc-data-table__cell',
          sortable: true,
        },
      ],
      ajax: {
        url: environment.Proctor_Count_Views_URL,
        type: 'POST',
        dataType: 'json',
        data: {
          apiKey: environment.Proctor_Count_Views_Api_Key,
          UserId: localStorage.getItem('UserId'),
          UserRoleId: localStorage.getItem('UserRoleId'),
        },
        dataSrc: 'StateAndLanguagewiseProctorCountData.ProctorCountData',
        beforeSend: function () {
          $('#image').show();
        },
        complete: function () {
          $('#image').hide();
        },
      },
      columns: [
        { data: 'StateName' },
        {
          data: 'EnglishCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              `<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">` +
              row.EnglishCount +
              `</a>`;
            return a;
          },
        },
        {
          data: 'HindiCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.HindiCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'TamilCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.TamilCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'TeluguCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.TeluguCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'KannadaCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.KannadaCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'GujaratiCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.GujaratiCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'OriyaCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.OriyaCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'AssameseCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.AssameseCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'UrduCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.UrduCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'MarathiCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.MarathiCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'MalayalamCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.MalayalamCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'BengaliCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.BengaliCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'PunjabiCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.PunjabiCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'ManipuriCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.ManipuriCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'TotalCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.TotalCount +
              '</a>';
            return a;
          },
        },
        {
          data: 'DistinctTotalCount',
          render: function (data: any, type: any, row: any, meta: any) {
            var a =
              '<a style="text-decoration:none" _ngcontent-kci-c162="" ng-reflect-router-link="/assessment-details" href="/assessment-details">' +
              row.DistinctTotalCount +
              '</a>';
            return a;
          },
        },
      ],
    };
    const burger: any = document.querySelector('.burger');
    const nav: any = document.querySelector('.nav-links');
    const nav_items = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      nav_items.forEach((link: any, index) => {
        if (link.style.animation) link.style.animation = '';
        else {
          link.style.animation = `navlinkdesign 0.5s ease forwards ${
            index / 7 + 0.4
          }s`;
          nav.style.transition = `transform 0.5s ease-in`;
        }
      });
      burger.classList.toggle('toggle');
    });
  }
}
