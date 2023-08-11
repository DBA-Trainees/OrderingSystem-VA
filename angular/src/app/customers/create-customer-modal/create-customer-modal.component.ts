import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { extend } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCustomerDto, CustomerServiceProxy, DivisionDto, DivisionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: './create-customer-modal.component.html'
})

export class CreateCustomerModalComponent extends AppComponentBase implements OnInit {    
    saving = false;
    customer = new CreateCustomerDto();
    divisions: DivisionDto[] =[];
    selectDivisionId: number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _customerService : CustomerServiceProxy,
        private _divisionService : DivisionServiceProxy,
        public bsModalRef : BsModalRef
    ) { 
        super(injector);
    }

    ngOnInit(): void {
        this._divisionService.getAllDivisions().subscribe(
            (result) => {
                this.divisions = result;
            }
        )
     }

    save() : void {
        this.saving = true;
        this.customer.divisionId = this.selectDivisionId;

        this._customerService.create(this.customer).subscribe(
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