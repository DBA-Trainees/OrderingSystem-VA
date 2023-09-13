import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CreateOrderDto, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';

enum foodSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large'
}

class PagedOrderRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
    animations: [appModuleAnimation()]
})

export class OrderComponent extends PagedListingComponentBase<OrderDto>{
    
    orders : OrderDto[] = [];
    order = new OrderDto;
    foods : FoodDto[] = [];
    foodDetails = new FoodDto();
    
    keyword = '';
    isActive : boolean | null;
    saving = false;
    selectFoodId : number = null;
    defaultQty = 1;    
    defaultSize = 'Small';
    id : number;
    foodLabels = [
        foodSize.Small,
        foodSize.Medium,
        foodSize.Large
    ]
    value : number = 1;
     selectedSize : string;
    
    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _foodService : FoodServiceProxy,
        private _orderService : OrderServiceProxy,
        private router : Router
    ) { 
        super(injector);
    }

    CheckOrderDetails(food : FoodDto) : void {
        sessionStorage.setItem('id', food.id.toString())
        this.ViewOrderDetails();
    }

    protected list(
        request: PagedOrderRequestDto, 
        pageNumber: number, 
        finishedCallback: Function
        ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._foodService
            .getAllFoodWithCategoryAndType(
                request.keyword,
                request.isActive,
                request.skipCount,
                request.maxResultCount
            )
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result : FoodDtoPagedResultDto) => {
                this.foods = result.items;
                this.showPaging(result, pageNumber);
            })
    }

    protected delete(order: OrderDto): void {
        abp.message.confirm(
            this.l('FoodDeleteWarningMessage', order.foodId),
            undefined,
            (result: boolean) => {
              if (result) {
                this._orderService.delete(order.id).subscribe(() => {
                  abp.notify.success(this.l('SuccessfullyDeleted'));
                  this.refresh();
                });
              }
            }
        );
    }

    ViewOrderDetails() : void {
        this.router.navigate(["./app/orders/viewOrderDetails-dialog"]);
    }
}