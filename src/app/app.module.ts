import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductItemComponent } from './products/products-list/product-item/product-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductService } from './products/product.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ShippingComponent } from './shopping-cart/shipping/shipping.component';
import { AuthComponent } from './auth/auth.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from '../app/store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

const firebaseConfig = {
  apiKey: 'AIzaSyAAYA8-8jEi1E43K-zRBIpaHqkDYp2pGyQ',
  authDomain: 'test-app-4e5fa.firebaseapp.com',
  databaseURL:
    'https://test-app-4e5fa-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'test-app-4e5fa',
  storageBucket: 'test-app-4e5fa.appspot.com',
  messagingSenderId: '514706764059',
  appId: '1:514706764059:web:bcbc36bb89750a86cc63be',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    ShoppingCartComponent,
    SidenavListComponent,
    ShippingComponent,
    AuthComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [ProductService, ShoppingCartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
