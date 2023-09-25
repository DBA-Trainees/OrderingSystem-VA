import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

class PagedOrdersRequestDto extends PagedRequestDto {
    keyword : string;
    isActive: boolean | null;
    isStatus : number | null;
}

@Component({
    templateUrl: './customer-dashboard.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./customer-dashboard.component.css']
})

export class CustomerDashboardComponent extends PagedListingComponentBase<OrderDto> implements OnInit {

    orders : OrderDto[] = [];
    order = new OrderDto;
    keyword = '';
    isActive : boolean | null;
    isStatus : number | null;
    setCurrentDate = moment().format('YYYY-MM-DD');
    setEndDate = moment().endOf('month').format('YYYY-MM-DD');
    array = [];
    filteredRecords: any;
    isNoRecordFound : boolean = false;


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
            getAllOrderWithFoodBasedOnIdAndStatusComplete(
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
                this.filterDate();
            });        
    }
    protected delete(entity: OrderDto): void {
        throw new Error('Method not implemented.');
    }

    reverseAndTimeStamp(dateString) {
        const reverse = new Date(dateString.split("/").reverse().join("/"));
        return reverse.getTime();
    }

    filterDate() {
        const selectedMembers = this.orders.filter(m  => {
            return this.reverseAndTimeStamp(m.dateTimeOrdered.format('YYYY-MM-DD')) >= this.reverseAndTimeStamp(this.setCurrentDate)
            && this.reverseAndTimeStamp(m.dateTimeOrdered.format('YYYY-MM-DD')) <= this.reverseAndTimeStamp(this.setEndDate)
        });
        this.array = selectedMembers;

        if (this.array.length > 0) {
            this.array = selectedMembers;
            this.isNoRecordFound = false;
        }
        else {
            this.array = this.orders;
            this.isNoRecordFound = true;
        }
    }
    
}