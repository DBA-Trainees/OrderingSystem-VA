import { 
  Component, 
  Injector } from "@angular/core";
import { 
  PagedListingComponentBase, 
  PagedRequestDto } from "@shared/paged-listing-component-base";
import { 
  CategoryDto, 
  CategoryDtoPagedResultDto, 
  CategoryServiceProxy } from "@shared/service-proxies/service-proxies";
import { 
  BsModalRef, 
  BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateCategoryModalComponent } from "./create-category-modal/create-category-modal.component";
import { EditCategoryModalComponent } from "./edit-category-modal/edit-category-modal.component";
import { appModuleAnimation } from "@shared/animations/routerTransition";


class PagedCategoryRequestDto extends PagedRequestDto {
  keyword : string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './categories.component.html',
  animations: [appModuleAnimation()]
})
export class CategoriesComponent extends PagedListingComponentBase<CategoryDto> {
  categories : CategoryDto[] = [];
  keyword = '';
  isActive : boolean | null;
  
constructor (
  injector : Injector,
  private _categoryService : CategoryServiceProxy,
  private _categoryModalService : BsModalService
) {
  super (injector);
}

createCategory() : void {
  this.showCreateOrEditCategoryModal();
}

editCategory(category : CategoryDto) : void {
  this.showCreateOrEditCategoryModal(category.id);
}

clearFilters() : void {
  this.keyword = '';
  this.isActive = undefined;
  this.getDataPage(1);
}

protected list(
  request: PagedCategoryRequestDto, 
  pageNumber: number, 
  finishedCallback: Function 
  ): void {
  request.keyword = this.keyword;
  request.isActive = this.isActive;

  this._categoryService
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
    .subscribe((result: CategoryDtoPagedResultDto) => {
      this.categories = result.items;
      this.showPaging(result, pageNumber);
    });
}

protected delete(category : CategoryDto) : void {
  abp.message.confirm (
    this.l('CategoryDeleteWarningMessage', category.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryService.delete(category.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
  );
}

private showCreateOrEditCategoryModal(id?: number) : void {
  let createOrEditCategoryModal : BsModalRef;
  if (!id) {
    createOrEditCategoryModal = this._categoryModalService.show (
       CreateCategoryModalComponent,
       {
        class: 'modal-lg'
       }     
    );
  } else {
    createOrEditCategoryModal = this._categoryModalService.show (
      EditCategoryModalComponent,
      {
        class : 'modal-lg',
        initialState: {
          id : id,
        },
      }
    );
  }

  createOrEditCategoryModal.content.onSave.subscribe(() => {
    this.refresh();
  });
}

}

