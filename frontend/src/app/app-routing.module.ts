import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { BatteryComponent } from './battery/battery.component';
import {AdminHomeComponent } from './admin-home/admin-home.component';
import { MapComponent } from './map/map.component';
import { SellerSettingsComponent } from 'src/app/seller-settings/seller-settings.component';
import { BuyerSettingsComponent } from 'src/app/buyer-settings/buyer-settings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'seller-settings', component: SellerSettingsComponent},
  { path: 'buyer-settings', component: BuyerSettingsComponent ,},
  { path: '', component: LandingPageComponent },
  { path: 'battery', component: BatteryComponent },
<<<<<<< HEAD
  { path: 'admin', component: AdminHomeComponent },
=======
  { path: 'admin', component: AdminHomeComponent }
>>>>>>> 5ccdb0d481b783f8539371de5e8e9fe7367f751d
  { path: 'map', component: MapComponent }
  

  //{ path: '**', redirectTo: '/home'}// The "Catch-All" Route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
