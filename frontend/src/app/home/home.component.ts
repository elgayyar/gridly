import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile;
  isConsumer;
  
  constructor(private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard){ }

  ngOnInit() {
    console.log("Token", localStorage.getItem("token"));
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);
    //Check is the user is a producer or consumer
    if(this.userProfile.accountStatus == "CONSUMER") {
      this.isConsumer = true;
    } else {
      this.isConsumer = false;
    }
    console.log("Account status", this.isConsumer);
  }

}
