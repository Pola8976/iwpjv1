import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerSignupComponent } from './seller/seller-signup/seller-signup.component';
import { SellerComponent } from './seller/seller/seller.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },
  
  { path: 'seller', component: SellerComponent },
  { path: 'seller/signup', component: SellerSignupComponent },
  { path: 'seller/login', component: SellerLoginComponent },
  { path: 'seller/dash', component: SellerDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
