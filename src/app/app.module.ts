import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SellerSignupComponent } from './seller/seller-signup/seller-signup.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { AuthGuard } from './auth.guard';
import { SellerComponent } from './seller/seller/seller.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SellerSignupComponent,
    SellerLoginComponent,
    SellerComponent,
    SellerDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
