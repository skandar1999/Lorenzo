import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShopComponent } from './shop/shop.component';
import { ProductshopComponent } from './productshop/productshop.component';
import { AddproductComponent } from './DASHBOARD/addproduct/addproduct.component';
import { POLOlistComponent } from './pololist/pololist.component';
import { CHEMISElistComponent } from './chemiselist/chemiselist.component';
import { TShirtlistComponent } from './t-shirtlist/t-shirtlist.component';
import { AppForbiddenComponent } from './app-forbidden/app-forbidden.component';
import { UserGuard } from './guards/user.guard';
import { PromotionComponent } from './promotion/promotion.component';
import { DashboardHomeComponent } from './DASHBOARD/dashboard-home/dashboard-home.component';
import { AdminGuard } from './guards/admin.guard';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { CommandeListeComponent } from './DASHBOARD/commande-liste/commande-liste.component';

const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },

  { path: 'inscrit', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'profile', component: ProfileDetailsComponent ,canActivate: [UserGuard]  },

  { path: 'shop', component: ShopComponent },
  { path: 'products/:id', component: ProductshopComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'dashboard', component: DashboardHomeComponent,canActivate: [AdminGuard]   },
  { path: 'commandePage', component: CommandeListeComponent },

  { path: 'pololiste', component: POLOlistComponent },
  { path: 'chemiselist', component: CHEMISElistComponent },
  { path: 'tshirtlist', component: TShirtlistComponent },

  { path: 'app-forbidden', component: AppForbiddenComponent },
  
  { path: 'promotion', component: PromotionComponent },
  { path: 'basket', component:  CartComponentComponent}


];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
