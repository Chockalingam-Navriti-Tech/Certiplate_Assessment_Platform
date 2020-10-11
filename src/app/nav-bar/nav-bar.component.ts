import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    /*if (document.fullscreenElement != null) {
      $("#full-screen").css("display", "none");
      $("#exit-full-screen").css("display", "block");
    } else {
      $("#full-screen").css("display", "block");
      $("#exit-full-screen").css("display", "none");
    }*/
  }

  elem = document.documentElement;

  clicked_fullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      $("#full-screen").css("display", "none");
      $("#exit-full-screen").css("display", "block");
    }
  }
  clicked_exitfullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      $("#full-screen").css("display", "block");
      $("#exit-full-screen").css("display", "none");
    }
  }
  
}
