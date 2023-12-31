import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { TypeComponent } from './types/types.component';
import { FoodComponent } from './foods/foods.component';
import { OrderComponent } from './orders/orders.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { CategoryServiceProxy, DivisionServiceProxy, FoodServiceProxy, OrderServiceProxy, TypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateDivisionModalComponent } from './divisions/create-division-modal/create-division-modal.component';
import { EditDivisionModalComponent } from './divisions/edit-division-modal/edit-division-modal.component';
import { CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateCustomerModalComponent }from './customers/create-customer-modal/create-customer-modal.component';
import { EditCustomerModalComponent } from './customers/edit-customer-modal/edit-customer-modal.component';
import { CreateCategoryModalComponent } from './categories/create-category-modal/create-category-modal.component';
import { EditCategoryModalComponent } from './categories/edit-category-modal/edit-category-modal.component';
import { CreateOrEditTypeModalComponent } from './types/createOrEdit-type-modal/createOrEdit-type-modal.component';
import { CreateOrEditFoodModalComponent } from './foods/createOrEdit-food-modal/createOrEdit-food-modal.component';
import { AddToCartOrderDialogComponent } from './orders/addtoCart-order-dialog/addtoCart-order-dialog.component';
import { OrderDetailsComponent } from './orders/viewOrderDetails-dialog/viewOrderDetails.component';

@NgModule({
    declarations: [		
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        DivisionsComponent,
        CreateDivisionModalComponent,
        EditDivisionModalComponent,
        CustomersComponent,
        CreateCustomerModalComponent,
        EditCustomerModalComponent,
        CategoriesComponent,
        CreateCategoryModalComponent,
        EditCategoryModalComponent,
        TypeComponent,
        CreateOrEditTypeModalComponent,
        FoodComponent,
        CreateOrEditFoodModalComponent,
        OrderComponent,
        AddToCartOrderDialogComponent,
        OrderDetailsComponent,
        VendorDashboardComponent,
        CustomerDashboardComponent
   ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule
    ],
    providers: [
        DivisionServiceProxy,
        CustomerServiceProxy,
        CategoryServiceProxy,
        TypeServiceProxy,
        FoodServiceProxy,
        OrderServiceProxy
    ]
})
export class AppModule {}
