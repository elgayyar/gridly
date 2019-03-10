import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile;
  disabled = true;

  constructor(private authService: AuthService) { }

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
  }

}
