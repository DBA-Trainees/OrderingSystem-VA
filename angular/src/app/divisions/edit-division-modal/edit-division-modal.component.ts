import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { DivisionDto, DivisionServiceProxy } from "@shared/service-proxies/service-proxies";
import { result } from "lodash-es";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component ({
    templateUrl: './edit-division-modal.component.html',
    styleUrls: ['./edit-division-modal.component.css']
})
export class EditDivisionModalComponent extends AppComponentBase implements OnInit {
    
  saving = false;
  division = new DivisionDto;
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor (
    injector: Injector,
    private _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef
  ){
    super(injector)
  }

  ngOnInit(): void {
    this._divisionService.get(this.id).subscribe((result) => {
      this.division=result;
    })
  }

  save(): void {
    this.saving = true;

      this._divisionService.update(this.division).subscribe(
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