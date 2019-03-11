import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA}  from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent implements OnInit {
  userProfile;
  loading = false;
  disabled = true;
  findBattery = false;

  constructor(private authService: AuthService,
              private registerService: RegisterService,) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);

  }

  //Brings up modal that seaches for a battery
  searchForBattery() {
    this.findBattery = true;
    setTimeout( () => { 
      $('#batterySearch').modal('hide');
      $('#batteryFound').modal('show');
    }, 2000 );
  }

  //Adds the battery that was selected
  addBattery() {
    $('#batteryFound').modal('hide');
    //Dummy data for a batery
    const batteryData = {
      "$class": "gridly.battery.Battery",
      "batteryId": "1",
      "serialNo": "89760593203",
      "manufacturer": "Tesla",
      "model": "Powerwall",
      "maxCapacity": 13.5,
      "currentCapacity": 10
    }
    //Add the battery to the users profile
    this.userProfile.battery = batteryData;
    console.log(this.userProfile);
    /*
    this.registerService.addBattery(this.userProfile.addBattery, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        //this.userProfile = res;
        //localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
        //this.disabled = true;
      },
      error => {
        console.log("Error response from hyperledger");
      });
      */
  }


}
