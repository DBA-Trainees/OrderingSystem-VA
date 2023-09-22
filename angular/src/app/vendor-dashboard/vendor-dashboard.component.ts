import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { OrderDto, OrderServiceProxy, OrderDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

class PagedOrdersRequestDto extends PagedRequestDto {
    keyword : string;
    isActive: boolean | null;
    isStatus : number | null;
}

@Component({
    templateUrl: './vendor-dashboard.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./vendor-dashboard.component.css']
})

export class VendorDashboardComponent extends PagedListingComponentBase<OrderDto> {
    orders : OrderDto[] = [];
    order = new OrderDto;
    keyword = '';
    isActive : boolean | null;
    isStatus : number | null;
    advancedFiltersVisible = false;
    setStartDate = moment().format('YYYY-MM-DD');
    setEndDate = moment().endOf('month').format('YYYY-MM-DD');
    indexValue : number;
    totalSales : number;
    totalSalesCompleted : number;
    totalSalesPending : number;
    totalCustomer : number;
    CustomerId : number;
    array = [];

    constructor(
        injector : Injector,
        private _orderService : OrderServiceProxy
    ) {
        super(injector);
    }

    clearFilters(): void {
        this.keyword = '';
        this.isActive = undefined;
        this.isStatus = undefined;
        this.setStartDate = moment().format('YYYY-MM-DD');
        this.setEndDate = moment().endOf('month').format('YYYY-MM-DD');
        this.getDataPage(1);
    }

    protected list(
        request: PagedOrdersRequestDto, 
        pageNumber: number, 
        finishedCallback: Function
        ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;
        request.isStatus = this.isStatus;

        this._orderService.
                getAllOrderWithFoodWithAllStatus(
                request.keyword,
                request.isActive,
                request.isStatus,
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
                this.array = this.orders;
                this.showPaging(result, pageNumber);
                this.getTotalSales(this.orders);
            });        
    }
    protected delete(entity: OrderDto): void {
        throw new Error('Method not implemented.');
    }

    getTotalSales(index) {
        this.indexValue = 0;
        this.totalSales = 0;
        this.totalCustomer = 0;
        this.totalSalesCompleted = 0;
        this.totalSalesPending = 0;
        this.CustomerId = 0;
        

        this.indexValue = index;
        for (let i = 0; i < index.length ; i++) {
            this.totalSales += this.indexValue[i].totalPrice

            if (this.indexValue[i].status == 1) {
                this.totalSalesCompleted += this.indexValue[i].totalPrice
            }
            else {
                this.totalSalesPending += this.indexValue[i].totalPrice
            }

            if (this.indexValue[i].userId != this.CustomerId) {
                this.CustomerId = this.indexValue[i].userId
                this.totalCustomer += 1
            }
        }
    }

    reverseAndTimeStamp(dateString) {
        const reverse = new Date(dateString.split("/").reverse().join("/"));
        return reverse.getTime();
    }

    filterDate() {
        if (this.setStartDate && this.setEndDate) {
            const selectedMembers = this.orders.filter(m  => {
                return this.reverseAndTimeStamp(m.dateTimeOrdered.format('YYYY-MM-DD')) >= this.reverseAndTimeStamp(this.setStartDate) 
                && this.reverseAndTimeStamp(m.dateTimeOrdered.format('YYYY-MM-DD')) <= this.reverseAndTimeStamp(this.setEndDate)
            });
            this.array = selectedMembers;
        }
        else {
            this.array = this.orders;
        }
        this.getTotalSales(this.array);
    }



}