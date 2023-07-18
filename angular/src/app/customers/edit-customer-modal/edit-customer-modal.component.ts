import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCustomerDto, CustomerDto, CustomerServiceProxy, DivisionDto, DivisionServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: './edit-customer-modal.component.html'
})
export class EditCustomerModalComponent extends AppComponentBase implements OnInit {
    saving = false;
    customer = new CustomerDto;
    division = new DivisionDto;
    divisions : DivisionDto[] = [];
    id : number;
    selectedDivisionId : number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _customerService : CustomerServiceProxy,
        private _divisionService : DivisionServiceProxy,
        public bsModalRef : BsModalRef
    ) { 
        super(injector)
    }

    ngOnInit() : void { 
        if (this.id != null)
        {
            this._divisionService.getAllDivisions().subscribe(
                (result) => {
                    this.divisions = result;
                }
            )
        } else {
            this._divisionService.get(this.customer.divisionId).subscribe(
                (result) => {
                    this.division = result;
                }
            )
        }
        
        this._customerService.get(this.id).subscribe((result) => {
            this.customer = result;
        }) 
    }

    save() : void {
        this.saving = true;
        this.customer.divisionId = this.selectedDivisionId;

        this._customerService.update(this.customer).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            () => {
                this.saving = false;
            }
        );
    }

}