import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOrderDto, FoodDto, FoodServiceProxy, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize, reduce } from 'rxjs/operators';
import { result } from 'lodash-es';


class PagedOrderRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './addToCart-order-dialog.component.html',
    animations: [appModuleAnimation()]
})

export class AddToCartOrderDialogComponent extends PagedListingComponentBase<OrderDto> {

    keyword = '';
    isActive : boolean | null;
    orders : OrderDto[] = [];
    firstTableData = [];
    itemRow : any[];
    priceTotal : number = 0;
    private priceValue;


    @Output() onSave = new EventEmitter<any>();
    myForm: any;

    constructor(
        injector : Injector,
        private _orderService : OrderServiceProxy,
        private _foodService : FoodServiceProxy
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

    // getTotalPriceSum(orders : OrderDto) : number {
    //    return reduce((total, order) => total + order.priceTotal, 0);
    // }
    
}