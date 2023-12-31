import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AppComponentBase } from "@shared/app-component-base";
import { CategoryDto, CategoryServiceProxy, FoodDto, FoodServiceProxy, TypeDto, TypeServiceProxy } from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

enum foodSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large'
}

@Component({    
    templateUrl: './createOrEdit-food-modal.component.html',
    styleUrls: ['./createOrEdit-food-modal.component.css']
})
export class CreateOrEditFoodModalComponent extends AppComponentBase implements OnInit {

    isDisabled : boolean = true;
    isEdit = false;
    saving = false;    
    foods = new FoodDto;
    categories : CategoryDto[] = [];
    types : TypeDto[] = [];
    id : number;
    selectedCategoryId : number = null;
    selectedTypeId : number = null;
    selectedSize : string;
    base64textString: string;
    imgFileName : string;
    imgFileType : string;
    amountCtrl = new FormControl(null, {updateOn: 'blur'});
    foodLabels = [
        foodSize.Small,
        foodSize.Medium,
        foodSize.Large
    ]    

    @Output() onSave = new EventEmitter<any>()
    
    constructor(
        injector : Injector,
        private _foodService : FoodServiceProxy,
        private _categoryService : CategoryServiceProxy,
        private _typeService : TypeServiceProxy,
        public bsModalRef : BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if(this.id) {
            this.isEdit = true;
            this._foodService.get(this.id).subscribe((result => {
                this.foods = result;
                this.selectedCategoryId = result.categoryId;
                this.selectedTypeId = result.typeId;
                this.selectedSize = result.size;
                this.base64textString = result.image;
                this.imgFileName = result.imageName;
                this.imgFileType = result.imageFileType;
            }))
        }       
        this._categoryService.getAllCategories().subscribe(
            (result) => {
                this.categories = result;
            }
        )
        this._typeService.getAllTypes().subscribe(
            (result) => {
                this.types = result;
            }
        )
    }

    onFileSelected(event: any) : void{
        var files : File = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = (res: any) => {
            this.base64textString = res.target.result.split(",")[1];
            this.imgFileName = files.name;
            this.imgFileType = files.type;
        };      
    }   

    saveFood() : void {
        this.saving = true;
        this.foods.image = this.base64textString;
        this.foods.imageName = this.imgFileName;
        this.foods.imageFileType = this.imgFileType;
        this.foods.categoryId = this.selectedCategoryId;
        this.foods.typeId = this.selectedTypeId;        
        this.foods.size = this.selectedSize;

        if(this.id > 0) {
            this._foodService.update(this.foods).subscribe(
                () => {
                    console.log(this.foods.id);
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                    this.isEdit = false;
                }
            )
        } else {
            this._foodService.create(this.foods).subscribe(
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
