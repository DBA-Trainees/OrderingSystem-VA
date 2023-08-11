import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CreateOrderDto, FoodDto, FoodDtoPagedResultDto, FoodServiceProxy, OrderDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
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

export class OrderComponent extends PagedListingComponentBase<OrderDto> implements OnInit{
    
    orders : OrderDto[] = [];
    order = new CreateOrderDto();
    foods : FoodDto[] = [];
    foodDetails = new FoodDto;
    keyword = '';
    isActive : boolean | null;
    saving = false;
    selectFoodId : number = null;
    defaultQty = 1;    
    defaultSize = 'Small';
    value : number = 1;
    // renderedValue : string;
    minimumValue = 1;
    selectedSize : string;
    foodLabels = [
        foodSize.Small,
        foodSize.Medium,
        foodSize.Large
    ]
    
    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _foodService : FoodServiceProxy,
        private _orderService : OrderServiceProxy,
        private router : Router
    ) { 
        super(injector)
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

    saveOrder(foodId : number) : void {
        this.saving = true;
        this.order.foodId = foodId;
        this.order.quantity = this.defaultQty;
        this.order.size = this.defaultSize;

        this._orderService.create(this.order).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.onSave.emit();
                this.router.navigate(["./app/orders/addToCart-order-dialog"]);
            },
            () => {
                this.saving = false;
            }
        );
    }

    AddQty() : void {
            this.value += 1;
        
        // this.renderedValue = this.value.toString();
        // console.log(this.value);
    }

    LessQty() : void {
        if (this.value > 1) {
            this.value -= 1;
            // this.renderedValue = this.value.toString();
        }
        
    }

    // toggleAdd = () => {
    //     console.log(this.foodDetails.quantity);
    //     // this.value = this.value + this.order.quantity;
    //     // this.renderedValue = this.value.toString();
    //     // console.log(this.renderedValue);
    // };

    // toggleLess = () => {
    //     if (this.value - this.order.quantity >= this.minimumValue ) {
    //         this.value = this.value - this.defaultQty;
    //         this.renderedValue = this.value.toString();
    //         console.log(this.renderedValue);
    //     }        
    // };
}