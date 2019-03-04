import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  provinces = ["AB", "BC", "MB", "NB", "NL", "NT", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"]

  constructor() { }

  ngOnInit() {
  }

}
