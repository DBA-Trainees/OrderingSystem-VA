import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOrderDto, FoodDto, FoodServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize, reduce } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { result } from 'lodash-es';
import { Router } from '@angular/router';

class PagedOrderRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './addToCart-order-dialog.component.html',
    styleUrls: ['./addToCart-order-dialog.component.css'],
    animations: [appModuleAnimation()]
})

export class AddToCartOrderDialogComponent extends PagedListingComponentBase<OrderDto> {

    saving = false;
    id : number;
    keyword = '';
    isActive : boolean | null;
    orders : OrderDto[] = [];
    order = new OrderDto;
    food = new FoodDto;
    priceTotal : number = 0;
    priceValue : number;
    dataValue : number;
    orderStatus : number = 1;
    orderQty : number;
    

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _orderService : OrderServiceProxy,
        private _foodService : FoodServiceProxy,
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

        this._orderService
            .getAllOrderWithFood(
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
            .subscribe((result : OrderDtoPagedResultDto) => {
                this.orders = result.items;
                this.showPaging(result, pageNumber);
                this.getTotalAmount(this.orders);
            })
        
    }
    
    protected delete(order: OrderDto): void {
        abp.message.confirm(
            this.l('OrderDeleteWarningMessage', order.id),
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

    getTotalAmount(data) {
        this.priceValue = 0;
        this.priceTotal = 0;
        
        this.priceValue = data;
        console.log(this.priceValue);
        for (let i = 0; i < data.length ; i++) {
            this.priceTotal += this.priceValue[i].totalPrice
            console.log(this.priceTotal);
        }
    }

    placeOrder(data) : void {
        abp.message.confirm (
            undefined,
            undefined,
            (result : boolean) => {
                if (result) {
                    this.saving = true;
                    var newOrder = new OrderDto;

                    data.forEach(item => {
                        this._orderService.get(item.id).subscribe((result) => {
                            newOrder = result;
                            newOrder.status = this.orderStatus;
                            newOrder.quantity = item.quantity;
                            newOrder.notes = item.notes;
                            newOrder.totalPrice = item.totalPrice * item.quantity;
                        
                            this._orderService.update(newOrder).subscribe(
                                () => {
                                    this.onSave.emit();
                                    this.notify.info(this.l('SavedSuccessfully'));
                                    this.refresh();
                                }
                            ) 
                        })          
                    });
                    this.saving = false;
                    
                    //this.router.navigate(["./app/orders"]);
                }
            }
        )

        
    }

    CheckQtyInput(event : any, input : any = null, maxQty : number) : void {
        let value = +event;
 
        if (value < 1) value = 1;
        if (value > maxQty) value = maxQty;
        this.orderQty = value;
 
        if (input.value != value) {
         const start = input.selectionStart ? input.selectionStart - 1: -1;
         input.value = value;
         if (start > 0) input.selectionStart = input.selectionEnd = start;
        }
     }



    
    
}