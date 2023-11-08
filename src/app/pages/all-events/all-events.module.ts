import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { FilterPlacePageModule } from '../filter-place/filter-place.module';
import { LocationSelectPageModule } from '../location-select/location-select.module';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { AllEventsComponent } from './all-events.component';


@NgModule({
  declarations: [
    AllEventsComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    SwiperModule,
    FilterPlacePageModule,
    LocationSelectPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: AllEventsComponent
      }
    ])
  ]
})

export class AllEventsModule { }
