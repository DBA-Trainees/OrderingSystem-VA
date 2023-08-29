import { Component, Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateOrEditFoodModalComponent } from './createOrEdit-food-modal/createOrEdit-food-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

class PagedFoodRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './foods.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./foods.component.css']
})

export class FoodComponent extends PagedListingComponentBase<FoodDto> {
    
    foods : FoodDto[] = [];
    keyword = '';
    isActive : boolean | null;

    constructor(
        injector : Injector,
        private _foodService : FoodServiceProxy,
        private _foodModalService : BsModalService
    ) { 
        super(injector);
     }

     createFood() : void {
        this.showCreateOrEditFoodModal();
     }

     editFood(food : FoodDto) : void {
      this.showCreateOrEditFoodModal(food.id)  
     }

    protected list(
        request: PagedFoodRequestDto, 
        pageNumber: number, 
        finishedCallback: Function
        ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._foodService
            .getAllFoodWithCategoryAndType(
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
            .subscribe((result : FoodDtoPagedResultDto) => {
                this.foods = result.items;
                this.showPaging(result, pageNumber);
            })
    }

    protected delete(food: FoodDto): void {
        abp.message.confirm(
            this.l('FoodDeleteWarningMessage', food.name),
            undefined,
            (result: boolean) => {
              if (result) {
                this._foodService.delete(food.id).subscribe(() => {
                  abp.notify.success(this.l('SuccessfullyDeleted'));
                  this.refresh();
                });
              }
            }
        );
    }    

    private showCreateOrEditFoodModal(id?: number) : void {
        let createOrEditFoodModal : BsModalRef;
        if(!id) {
            createOrEditFoodModal = this._foodModalService.show(
                CreateOrEditFoodModalComponent,
                {
                    class : 'modal-lg',
                }
            );
        } else {
            createOrEditFoodModal = this._foodModalService.show(
                CreateOrEditFoodModalComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    },
                }
            );
        }


        createOrEditFoodModal.content.onSave.subscribe(() => {
            this.refresh();
        });
    }

}