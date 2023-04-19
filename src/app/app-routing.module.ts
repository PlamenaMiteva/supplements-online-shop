import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsResolverService} from './products/products-resolver.service';
import { ShippingComponent } from './shopping-cart/shipping/shipping.component';
import { AuthComponent } from './auth/auth.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { VitaminsComponent } from './products/category/vitamins/vitamins.component';
import { MinaralsComponent } from './products/category/minarals/minarals.component';
import { HealthComponent } from './products/category/health/health.component';
import { SportComponent } from './products/category/sport/sport.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/vitamins', component: VitaminsComponent },
  { path: 'products/minerals', component: MinaralsComponent },
  { path: 'products/health', component: HealthComponent },
  { path: 'products/sport', component: SportComponent },
  { path: 'product/:id', component: ProductDetailsComponent, resolve: [ProductsResolverService] },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
