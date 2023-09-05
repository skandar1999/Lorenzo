import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShopComponent } from './shop/shop.component';
import { ProductshopComponent } from './productshop/productshop.component';
import { AddproductComponent } from './DASHBOARD/addproduct/addproduct.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalModule } from 'ngx-bootstrap/modal';
import { POLOlistComponent } from './pololist/pololist.component';
import { CHEMISElistComponent } from './chemiselist/chemiselist.component';
import { TShirtlistComponent } from './t-shirtlist/t-shirtlist.component';
import { AppForbiddenComponent } from './app-forbidden/app-forbidden.component';
import { PromotionComponent } from './promotion/promotion.component';
import { DashboardHomeComponent } from './DASHBOARD/dashboard-home/dashboard-home.component';
import { EditProductDialogComponentComponent } from './DASHBOARD/edit-product-dialog-component/edit-product-dialog-component.component';
import { SupprimeProductDialogComponentComponent } from './DASHBOARD/supprime-product-dialog-component/supprime-product-dialog-component.component';
import { CartComponentComponent } from './cart-component/cart-component.component';
import { CommandeFormulaireComponent } from './commande-formulaire/commande-formulaire.component';
import { CommandeListeComponent } from './DASHBOARD/commande-liste/commande-liste.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ResetpasswordComponent,
    ProfileDetailsComponent,
    ShopComponent,
    ProductshopComponent,
    AddproductComponent,
    EditProductDialogComponentComponent,
    SupprimeProductDialogComponentComponent,
    POLOlistComponent,
    CHEMISElistComponent,
    TShirtlistComponent,
    AppForbiddenComponent,
    PromotionComponent,
    DashboardHomeComponent,
    CartComponentComponent,
    CommandeFormulaireComponent,
    CommandeListeComponent,
    
  ],

  imports: [
    MatDialogModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwt');
        },
        allowedDomains: ['http://localhost:4200/']
      }
    }),
    BrowserAnimationsModule,
    ModalModule.forRoot(),

  ],

  entryComponents: [
    EditProductDialogComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
