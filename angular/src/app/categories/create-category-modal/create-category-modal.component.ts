import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { CategoryServiceProxy, CreateCategoryDto } from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    templateUrl: './create-category-modal.component.html',
    styleUrls: ['./create-category-modal.component.css']
})
export class CreateCategoryModalComponent extends AppComponentBase implements OnInit {
    saving = false;
    category = new CreateCategoryDto();

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _categoryService : CategoryServiceProxy,
        public bsModalRef : BsModalRef
    ) {
        super (injector);
    }

    ngOnInit(): void {
    }

    save() : void {
        this.saving = true;

        this._categoryService.create(this.category).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            () => {
                this.saving = false;
            }
        )
    }
}