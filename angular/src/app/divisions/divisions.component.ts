import { animation } from '@angular/animations';
import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { 
  PagedListingComponentBase, 
  PagedRequestDto 
} from '@shared/paged-listing-component-base';
import {
  DivisionDto,
  DivisionDtoPagedResultDto,
  DivisionServiceProxy
} from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { finalize } from 'rxjs/operators';
import { CreateDivisionModalComponent } from './create-division-modal/create-division-modal.component';
import { EditDivisionModalComponent } from './edit-division-modal/edit-division-modal.component';

class PagedDivisionRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './divisions.component.html',
  animations: [appModuleAnimation()]
})
export class DivisionsComponent extends PagedListingComponentBase<DivisionDto> {
  divisions : DivisionDto[] = [];
  keyword = '';
  isActive : boolean | null;
  advancedFiltersVisible = false;

  constructor (
    injector: Injector,
    private _divisionService : DivisionServiceProxy,
    private _divisionModalService : BsModalService
  ) {
    super(injector);
  }

  createUser(): void {
    this.showCreateOrEditDivisionModal();
  }

  editUser(division: DivisionDto): void {
    this.showCreateOrEditDivisionModal(division.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedDivisionRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._divisionService
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
      .subscribe((result: DivisionDtoPagedResultDto) => {
        this.divisions = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(division: DivisionDto): void {
    abp.message.confirm(
      this.l('DivisionDeleteWarningMessage', division.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._divisionService.delete(division.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditDivisionModal(id?: number): void {
    let createOrEditUserModal: BsModalRef;
    if (!id) {
      createOrEditUserModal = this._divisionModalService.show(
        CreateDivisionModalComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserModal = this._divisionModalService.show(
        EditDivisionModalComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditUserModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }


}
