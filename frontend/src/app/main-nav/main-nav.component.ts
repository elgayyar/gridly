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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
                this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
                //Check if the user is a producer or consumer
                if(this.userProfile.accountStatus == "CONSUMER") {
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

}
