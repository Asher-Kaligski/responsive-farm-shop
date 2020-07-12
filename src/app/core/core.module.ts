import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'shared/material.module';

import { SharedModule } from './../shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    NoAccessComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
  ],
  exports: [NavBarComponent],
})
export class CoreModule {}
