import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  old_password: HTMLInputElement;
  new_password: HTMLInputElement;
  conf_new_password: HTMLInputElement;

  constructor(private route: Router) {}

  ngOnInit(): void {}
  updatepassword() {
    this.old_password = document.getElementById(
      'oldpassword'
    ) as HTMLInputElement;
    this.new_password = document.getElementById(
      'newpassword'
    ) as HTMLInputElement;
    this.conf_new_password = document.getElementById(
      'confnewpassword'
    ) as HTMLInputElement;
    if (
      this.old_password.value == '' ||
      this.new_password.value == '' ||
      this.conf_new_password.value == ''
    ) {
      document.getElementById('warning').innerHTML =
        '<b> <h2>' + 'All field are required!' + '</h2></b>';
    } else if (this.conf_new_password.value != this.new_password.value) {
      document.getElementById('warning').innerHTML =
        '<b> <h2>' + 'Passwords did not matched!' + '</h2></b>';
    } else if (
      this.old_password &&
      this.new_password &&
      this.conf_new_password
    ) {
      this.change_password_authentication();
    }
  }

  change_password_authentication() {
    $.ajax({
      url: environment.URL_change_password,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey: environment.ApiKey,
        UserId: sessionStorage.getItem('UserId'),
        OldPassword: sessionStorage.getItem('password'),
        NewPassword: this.new_password.value,
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        if (json.ChangeUserPasswordData.StatusId == 1) {
          console.log(json.ChangeUserPasswordData.Message);
          this.route.navigate(['password_changed_successfully']);
        } else {
          document.getElementById('warning').innerHTML =
            '<b><h2>' + json.ChangeUserPasswordData.Message + '</h2></b>';
          $('#login').css('display', 'block');
          $('#log-in').css('display', 'none');
        }
      },
      error: function (err) {
        console.log('error:' + err);
        $('#login').css('display', 'block');
        $('#log-in').css('display', 'none');
      },
    });
  }

  clear() {
    $.ajax({
      url: environment.URL_logout_authentication,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey: environment.ApiKey,
        UserId: localStorage.getItem('USerId'),
        SessionId: sessionStorage.getItem('SessionId'),
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        localStorage.setItem(
          json.LogoutResponseData.Message,
          JSON.stringify(data)
        );
        if (json.LogoutResponseData.Message == 'User logged out') {
          sessionStorage.clear();
          this.route.navigate(['logout']);
        } else if (
          json.LogoutResponseData.Message == 'User has already been logged out'
        ) {
          this.route.navigate(['login']);
        } else {
          document.getElementById('warning').innerHTML =
            '<b><h2>' +
            json.CandidateAssessmentAuthentication.Message +
            '</h2></b>';
          $('#login').css('display', 'block');
          $('#log-in').css('display', 'none');
        }
      },
      error: function (err) {
        console.log('error:' + err);
        $('#login').css('display', 'block');
        $('#log-in').css('display', 'none');
      },
    });
  }
  clicked() {
    if (sessionStorage.getItem('previous_page') == "proctor-attributes") {
      this.route.navigate(['proctor-attributes']);
    }
    else {
      this.route.navigate(['proctor-count-views']);
    }
  }
}
