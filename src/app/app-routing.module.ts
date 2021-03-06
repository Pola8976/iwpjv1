import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './seller/product-create/product-create.component';
import { ProductEditComponent } from './seller/product-edit/product-edit.component';
import { ProductViewComponent } from './seller/product-view/product-view.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerSettingsComponent } from './seller/seller-settings/seller-settings.component';
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
  { path: 'seller/dash', component: SellerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'seller/create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'seller/view/:pid', component: ProductViewComponent, canActivate: [AuthGuard] },
  { path: 'seller/edit/:pid', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'seller/settings', component: SellerSettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
