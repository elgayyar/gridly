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

  constructor(private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard){ }

  ngOnInit() {
    console.log("Token", localStorage.getItem("token"));
    console.log(this.authService.getActiveProfile());
  }



}
