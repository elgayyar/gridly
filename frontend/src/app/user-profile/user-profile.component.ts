import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile;
  loading = false;
  disabled = true;

  constructor(private authService: AuthService,
              private registerService: RegisterService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);

  }

  //Make profile fields accesible
  editProfile() {
    this.disabled = false;
  }

  //Cancel changes to profile
  cancel() {
    this.disabled = true;
    this.loading = false;
  }

  //Save changes made to users profile
  save() {
    this.loading = true;
    if(this.userProfile.accountStatus == "CONSUMER") {
      this.updateConsumerProfile()
    } else {
      this.updateProducerProfile()
    }
  }

  //Update the consumers profile in HYPERLEDGER
  updateConsumerProfile() {
    this.registerService.updateConsumer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
        this.disabled = true;
      },
      error => {
        console.log("Error response from hyperledger");
      });
  }

  //Update the producers profile in HYPERLEDGER
  updateProducerProfile() {
    this.registerService.updateProducer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
        this.disabled = true;
      },
      error => {
        console.log("Error response from hyperledger");
      });
  }
}
