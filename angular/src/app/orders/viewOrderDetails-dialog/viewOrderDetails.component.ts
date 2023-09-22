import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { FoodDto, FoodServiceProxy, OrderDto, OrderServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

enum foodSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large'
}

@Component({
    templateUrl: './viewOrderDetails.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ['./viewOrderDetails.component.css']
})

export class OrderDetailsComponent extends AppComponentBase implements OnInit {

    food = new FoodDto;
    order = new OrderDto;
    user = new UserDto;
    saving = false;
    id : number;
    selectedSize : string;
    orderQty : number = 1;
    priceOrder : number;
    currentFoodQty : number;
    orderTotalPrice : number;
    orderNotes : string;
    priceAmount : number;
    orderDateTime = new Date();
    isDisabled : boolean = true;
    
    foodLabels = [
        foodSize.Small,
        foodSize.Medium,
        foodSize.Large
    ]

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector : Injector,
        private _foodService : FoodServiceProxy,
        private _orderService : OrderServiceProxy,
        private router : Router
    ) {
        super(injector);
    }

    ngOnInit() : void {
        if (parseInt(sessionStorage.getItem('id'))) {
            this._foodService.get(parseInt(sessionStorage.getItem('id'))).subscribe((result) => {
                this.food = result;
                this.selectedSize = result.size;
                this.priceAmount = result.price;
                this.UpdateFoodSize(this.food, this.selectedSize)
            });            
        }
    }

    addToCartOrder(foodId : number) : void {
        this.saving = true;
        this.order.foodId = foodId;
        this.order.quantity = this.orderQty;
        this.order.size = this.selectedSize;
        this.order.foodPrice = this.priceAmount;
        this.order.totalPrice = this.priceAmount * this.orderQty;
        this.order.notes = this.orderNotes;
        this.order.dateTimeOrdered = moment(this.orderDateTime);

        this._orderService.updateOrderTable(this.order).subscribe(
            () => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.onSave.emit();
                this.router.navigate(["./app/orders"]);
            },
            () => {
                this.saving = false;
            }
        );
    }

    UpdateFoodSize(food : FoodDto, newSize : string) : void {
        if (newSize == "Small") {
            this.priceAmount = this.food.price;
        }
        else if (newSize == "Medium") {
            this.priceAmount = this.food.price + 10;
        }
        else {
            this.priceAmount = this.food.price + 15;
        }
        console.log(this.priceAmount);
    }

    CheckQtyInput(event : any, input : any = null, maxQty : number) : void {
       let value = +event;

       if (value < 1) value = 1;
       if (value > maxQty) value = maxQty;
       this.orderQty = value;

       if (input.value != value) {
        const start = input.selectionStart ? input.selectionStart - 1: -1;
        input.value = value;
        if (start > 0) input.selectionStart = input.selectionEnd = start;
       }
    }

}