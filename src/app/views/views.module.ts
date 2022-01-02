import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from '../shared/shared.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    ComponentsCarouselModule,
    MatButtonModule,
    TabsModule.forRoot(),
    MatProgressBarModule,
  ]
})
export class ViewsModule { }
