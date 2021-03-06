import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  userProfile;
  isConsumer;
  isAdmin;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
                this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
                console.log(this.userProfile);
                //Check if the user is a producer or consumer
                if (this.userProfile.$class=="gridly.admin.Admin"){
                  this.isAdmin = true;
                } else if(this.userProfile.accountStatus == "CONSUMER") {
                  this.isConsumer = true;
                } else {
                  this.isConsumer = false;
                }
                console.log(this.userProfile.accountStatus);
              }

    //Log the user out and redirect them to the landing page
    logout() {
      console.log("Logout clicked");
      localStorage.clear();
      this.router.navigate(["/login"]);
    }

    //Navigate to the correct page
    /*
    navigate() {
      console.log(this.router.url);
      if(this.router.url == "/login" || '/register' || '') {
        this.router.navigate([""]);
      } else {
        this.router.navigate(["/home"]);
      }
    }
    */
}
