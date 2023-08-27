import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShopComponent } from './shop/shop.component';
import { ProductshopComponent } from './productshop/productshop.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ListeallproductsComponent } from './listeallproducts/listeallproducts.component';
import { POLOlistComponent } from './pololist/pololist.component';
import { CHEMISElistComponent } from './chemiselist/chemiselist.component';
import { TShirtlistComponent } from './t-shirtlist/t-shirtlist.component';

const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },

  { path: 'inscrit', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'shop', component: ShopComponent },

  { path: 'profile', component: ProfileDetailsComponent },
  { path: 'products/:id', component: ProductshopComponent },

  { path: 'addproduct', component: AddproductComponent },
  { path: 'listeallproducts', component: ListeallproductsComponent },

  { path: 'pololiste', component: POLOlistComponent },
  { path: 'chemiselist', component: CHEMISElistComponent },
  { path: 'tshirtlist', component: TShirtlistComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
