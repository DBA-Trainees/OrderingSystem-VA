import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { FoodDto, FoodServiceProxy, OrderDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { parse } from 'path';

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
    saving = false;
    food = new FoodDto;
    order = new OrderDto;
    id : number;
    selectedSize : string;
    orderQty : number = 1;
    priceOrder : number;
    orderTotalPrice : number;
    orderNotes : string;
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
            });
        }
    }

    addToCartOrder(foodId : number) : void {
        this.priceOrder = this.food.price * this.orderQty;

        this.saving = true;
        this.order.foodId = foodId;
        this.order.quantity = this.orderQty;
        this.order.size = this.selectedSize;
        this.order.totalPrice = this.priceOrder;
        this.order.notes = this.orderNotes;

        if (this.id > 0) {
            this._orderService.update(this.order).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.onSave.emit();
                    this.router.navigate(["./app/orders"]);
                },
                () => {
                    this.saving = false;
                }
            )
        } else {
            this._orderService.create(this.order).subscribe(
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
    }

    // disableOption(categoryId : number, value : string) : boolean {
    //     if (categoryId === 2) {
    //         return value === "No size";
    //     }
    // }

}