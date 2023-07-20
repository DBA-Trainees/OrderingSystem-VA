import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTypeDto, DivisionDto, TypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { type } from 'os';

@Component({
    templateUrl: './createOrEdit-type-modal.component.html'
})

export class CreateOrEditTypeModalComponent extends AppComponentBase implements OnInit {
    saving = false;
    type = new DivisionDto;
    id : number;

    @Output() onSave = new EventEmitter<any>()

    constructor(
        injector : Injector,
        private _typeService : TypeServiceProxy,
        public bsModalRef : BsModalRef
    ) { 
        super(injector);
    }

    ngOnInit() : void {
        if(this.id) {
            this._typeService.get(this.id).subscribe((result) => {
                this.type = result;
            })
        }
    }

    save() : void {
        this.saving = true;

        if(this.id > 0) {
            this._typeService.update(this.type).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            )
        } else {
            this._typeService.create(this.type).subscribe(
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
}