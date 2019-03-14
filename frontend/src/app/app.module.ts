import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDividerModule, MatCardModule, MatInputModule, MatFormFieldModule, MatTabsModule, MatSelectModule, MatStepperModule, MatTooltipModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
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
import { ReactiveFormsModule } from '@angular/forms';
import { BackgroundGraphicComponent } from './background-graphic/background-graphic.component';
import { BatteryComponent } from './battery/battery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SellerSettingsComponent } from './seller-settings/seller-settings.component';
import { BuyerSettingsComponent } from './buyer-settings/buyer-settings.component';
import { AdminService } from './services/admin.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//Fusion charts imports
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import { TransactionsComponent } from './transactions/transactions.component';
import {MatSortModule} from '@angular/material/sort'
import { MatChipsModule } from '@angular/material/chips';
import { ProductionModalComponent } from './production-modal/production-modal.component';
import { AdminMapComponent } from './admin-map/admin-map.component';



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
    BackgroundGraphicComponent,
    BatteryComponent,
    AdminHomeComponent,
    MapComponent,
    SellerSettingsComponent,
    BuyerSettingsComponent,
    TransactionsComponent,
    ProductionModalComponent,
    AdminMapComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
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
    MatSliderModule,
    MatGridListModule,
    MatStepperModule,
    FlexLayoutModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatChipsModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzjuXUKgTu4BjnL66oUP0jiGz30zuSuaM'
    }),
    FusionChartsModule,
    MatSortModule
    
  ],
  providers: [AuthGuard, AuthService,HttpClient,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
