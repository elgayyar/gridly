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

  searchForBattery() {
    this.findBattery = true;
    setTimeout( () => { 
      $('#batterySearch').modal('hide');
      $('#batteryFound').modal('show');
    }, 2000 );


  }


}
