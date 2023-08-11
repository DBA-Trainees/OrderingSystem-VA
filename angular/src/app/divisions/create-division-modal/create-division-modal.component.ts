import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  DivisionServiceProxy,
  CreateDivisionDto
} from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './create-division-modal.component.html'
})
export class CreateDivisionModalComponent extends AppComponentBase implements OnInit {
  saving = false;
  division = new CreateDivisionDto();
  
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    this._divisionService.create(this.division).subscribe(
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
