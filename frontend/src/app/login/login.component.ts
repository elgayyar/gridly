import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { AuthGuard } from '../guards/auth.guard'
import { Router } from "@angular/router";
import { Observable} from 'rxjs'
import {Subject} from "rxjs/Subject";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  triedLogin;
  statusMessage;
  processing;
  retrievedProfile;
  previousUrl
  

  constructor(private authService: AuthService,
              private router: Router,
              private authGuard: AuthGuard){ }
  ngOnInit() {
  }

  submitLogin() {
    console.log("submitted email is ", this.email);
    console.log("submitted password is ", this.password);
    const user = {
      email: this.email,
      encryptedPassword: this.password,
    };

    this.authService.login(user).subscribe(
      res => {
        console.log(res)
        let data = JSON.parse(JSON.stringify(res));
        if(!data.success){
          //if password isn't right
          console.log(data.success);
          this.triedLogin=true;
          this.statusMessage = "error, please try again";
        } else {
          this.triedLogin=true;
          this.statusMessage= "success!";

          //store user data
          this.authService.storeUserData(data.token);
        

          //navigate to appropriate home page after 2 second delay
          console.log("Users email", data.userAccount.email);
         this.authService.getProfile(data.userAccount.email).subscribe(res => {
            console.log("in login component: here's what getProfile returned: ", res);
            this.processing = true;
            for (let result of res){
              if (result[0]){
                this.retrievedProfile = result[0];
                break;
              }
            }
           console.log('log in component, retrieved profile! ',this.retrievedProfile);

            
          //redirect to home page 
          setTimeout(() => {
            if(this.previousUrl){
              $('#loading').modal('hide');
              this.router.navigate([this.previousUrl]);
            } else {
              $('#loading').modal('hide');
              this.router.navigate(['/home']);
            }
          }, 1000);
          
          let role = this.retrievedProfile.$class
          console.log ("role is: ", role);
          if (role ==="gridly.admin.Admin"){
                this.authService.setActiveProfile(this.retrievedProfile);
                this.authService.setActiveProfileType("admin"); //admin = 1
                localStorage.setItem("activeProfile", JSON.stringify(this.retrievedProfile));
                localStorage.setItem("activeProfileType", this.authService.activeProfileType);
           } else if (role ==="gridly.consumer.Consumer"){
             this.authService.setActiveProfile(this.retrievedProfile);
             this.authService.setActiveProfileType("consumer"); //consumer = 2
             localStorage.setItem("activeProfile", JSON.stringify(this.retrievedProfile));
             localStorage.setItem("activeProfileType", this.authService.activeProfileType);
           } else if (role ==="gridly.producer.Producer"){
             this.authService.setActiveProfile(this.retrievedProfile);
             this.authService.setActiveProfileType("producer"); //producer = 3
             localStorage.setItem("activeProfile", JSON.stringify(this.retrievedProfile));
             localStorage.setItem("activeProfileType", this.authService.activeProfileType);

             //redirect to admin home page
             setTimeout(() => {
               if(this.previousUrl){
                 this.router.navigate([this.previousUrl]);
               } else {
                 this.router.navigate(['/home']);
               }
             }, 1000);
           }
          
      })
      }
      },
      error => {
        console.log(error);
      });
  }

  
}
