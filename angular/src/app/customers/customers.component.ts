import { animation } from '@angular/animations';
import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerDto, CustomerDtoPagedResultDto, CustomerServiceProxy, DivisionDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateCustomerModalComponent } from './create-customer-modal/create-customer-modal.component';
import { EditCustomerModalComponent } from './edit-customer-modal/edit-customer-modal.component';

class PagedCustomerRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './customers.component.html',
    animations: [appModuleAnimation()]
})

export class CustomersComponent extends PagedListingComponentBase<CustomerDto> {
    
    customers : CustomerDto[] = [];
    //divisions : DivisionDto[] = [];
    keyword = '';
    isActive : boolean | null;    

    constructor(
        injector : Injector,
        private _customerService : CustomerServiceProxy,
        private _customerModalService : BsModalService
    ) { 
        super(injector); 
    }

    createCustomer() : void {
      this.showCreateOrEditCustomerModal();
    }

    editCustomer(customer : CustomerDto) : void {
      this.showCreateOrEditCustomerModal(customer.id);
    }

    clearFilter() : void {
      this.keyword = '';
      this.isActive = undefined;
      this.getDataPage(1);
    }

    protected list(
        request: PagedCustomerRequestDto, 
        pageNumber: number, 
        finishedCallback: Function
        ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._customerService
            .getAllCustomersWithDivisions(
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
            .subscribe((result : CustomerDtoPagedResultDto) => {
                this.customers = result.items;
                this.showPaging(result, pageNumber);
            })
    }
    protected delete(customer : CustomerDto): void {
        abp.message.confirm(
            this.l('CustomerDeleteWarningMessage', customer.name),
            undefined,
            (result: boolean) => {
              if (result) {
                this._customerService.delete(customer.id).subscribe(() => {
                  abp.notify.success(this.l('SuccessfullyDeleted'));
                  this.refresh();
                });
              }
            }
        );
    }

    private showCreateOrEditCustomerModal(id? : number) : void {
      let createOrEditCustomerModal : BsModalRef;
      if (!id) {
        createOrEditCustomerModal = this._customerModalService.show(
          CreateCustomerModalComponent,
          {
            class : 'modal-lg',
          }
        );
      } else {
        createOrEditCustomerModal = this._customerModalService.show(
          EditCustomerModalComponent,
          {
            class : 'modal-lg',
            initialState : {
              id : id,
            },
          }
        );
      }

      createOrEditCustomerModal.content.onSave.subscribe(() => {
        this.refresh();
      });

    }

}