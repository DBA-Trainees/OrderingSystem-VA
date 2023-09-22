import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './about.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent extends AppComponentBase implements OnInit {

  shownLoginName = '';
  userId : number;
  
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.shownLoginName = this.appSession.getShownLoginName();
    this.userId = this.appSession.getLoginUserId();
    console.log(this.userId);
  }
}
