import { 
    Component, 
    Injector } from '@angular/core';
import { 
    PagedListingComponentBase, 
    PagedRequestDto } from '@shared/paged-listing-component-base';
import { 
    TypeDto, 
    TypeDtoPagedResultDto, 
    TypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { 
    BsModalRef, 
    BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateOrEditTypeModalComponent } from './createOrEdit-type-modal/createOrEdit-type-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';

class PagedTypeRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './types.component.html',
    animations: [appModuleAnimation()]
})

export class TypeComponent extends PagedListingComponentBase<TypeDto> {
    types : TypeDto[] = [];
    keyword = '';
    isActive : boolean | null;

    constructor(
        injector : Injector,
        private _typeService : TypeServiceProxy,
        private _typeModalService : BsModalService
    ) { 
        super(injector);
    }

    createType() : void {
        this.showCreateOrEditTypeModal();
    }

    EditType(type : TypeDto) : void {
        this.showCreateOrEditTypeModal(type.id)
    }

    clearFilters(): void {
        this.keyword = '';
        this.isActive = undefined;
        this.getDataPage(1);
    }

    protected list(
        request: PagedTypeRequestDto, 
        pageNumber: number, 
        finishedCallback: Function
        ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._typeService
            .getAll(
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
            .subscribe((result : TypeDtoPagedResultDto) => {
                this.types = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(type : TypeDto): void {
        abp.message.confirm(
            this.l('TypeDeleteWarningMessage', type.name),
            undefined,
            (result: boolean) => {
              if (result) {
                this._typeService.delete(type.id).subscribe(() => {
                  abp.notify.success(this.l('SuccessfullyDeleted'));
                  this.refresh();
                });
              }
            }
          );
    }

    private showCreateOrEditTypeModal(id?: number) : void {
        let createOrEditTypeModal : BsModalRef;
        if (!id) {
            createOrEditTypeModal = this._typeModalService.show(
                CreateOrEditTypeModalComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            createOrEditTypeModal = this._typeModalService.show(
                CreateOrEditTypeModalComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    },
                }
            );
        }

        createOrEditTypeModal.content.onSave.subscribe(() => {
            this.refresh();
        });
    }
}