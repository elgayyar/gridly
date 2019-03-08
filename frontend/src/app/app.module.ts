import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDividerModule, MatCardModule, MatInputModule, MatFormFieldModule, MatTabsModule, MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UseageModalComponent } from './useage-modal/useage-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClient,HttpClientModule} from '@angular/common/http'
//authentication
import { AuthGuard} from './guards/auth.guard';
import { AuthService} from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    HomeComponent,
    LandingPageComponent,
    RegisterComponent,
    UserProfileComponent,
    UseageModalComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxChartsModule
  ],
  providers: [AuthGuard, AuthService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
