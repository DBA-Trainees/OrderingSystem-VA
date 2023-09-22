import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: './edit-category-modal.component.html',
    styleUrls: ['./edit-category-modal.component.css']
})
export class EditCategoryModalComponent extends AppComponentBase implements OnInit {
    saving = false;
    category = new CategoryDto;
    id : number;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _categoryService : CategoryServiceProxy,
        public bsModalRef : BsModalRef
    ) { 
        super(injector);
    }

    ngOnInit() : void {
        this._categoryService.get(this.id).subscribe((result) => {
            this.category = result;
        })
     }

    save() : void {
        this.saving = true;

        this._categoryService.update(this.category).subscribe(
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