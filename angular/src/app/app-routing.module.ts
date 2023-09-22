import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { TypeComponent } from './types/types.component';
import { FoodComponent } from './foods/foods.component';
import { OrderComponent } from './orders/orders.component';
import { AddToCartOrderDialogComponent } from './orders/addtoCart-order-dialog/addtoCart-order-dialog.component';
import { OrderDetailsComponent } from './orders/viewOrderDetails-dialog/viewOrderDetails.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },                    
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'divisions', component: DivisionsComponent, data: { permission: 'Pages.Divisions' }, canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustomersComponent, data: { permission: 'Pages.Customers' }, canActivate: [AppRouteGuard] },
                    { path: 'categories', component: CategoriesComponent, data: { permission: 'Pages.Categories' }, canActivate: [AppRouteGuard] },
                    { path: 'types', component: TypeComponent, data: { permission: 'Pages.Types' }, canActivate: [AppRouteGuard] },
                    { path: 'foods', component: FoodComponent, data: { permission: 'Pages.Foods' }, canActivate: [AppRouteGuard] },
                    { path: 'orders', component: OrderComponent, data: { permission: 'Pages.Orders' }, canActivate: [AppRouteGuard] },
                    { path: 'orders/addToCart-order-dialog', component: AddToCartOrderDialogComponent, data: { permission: 'Pages.Orders' }, canActivate: [AppRouteGuard]},
                    { path: 'orders/viewOrderDetails-dialog', component: OrderDetailsComponent, data: { permission: 'Pages.Orders' }, canActivate: [AppRouteGuard]},
                    { path: 'vendor-dashboard', component: VendorDashboardComponent, data: { permission: 'Pages.Foods' }, canActivate: [AppRouteGuard]},
                    { path: 'customer-dashboard', component: CustomerDashboardComponent, data: { permission: 'Pages.Orders' }, canActivate: [AppRouteGuard]}
                    

                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
