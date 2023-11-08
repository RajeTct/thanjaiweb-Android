import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { FilterPlacePageModule } from '../filter-place/filter-place.module';
import { LocationSelectPageModule } from '../location-select/location-select.module';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { CompanySearchComponent } from './company-search.component';

@NgModule({
  declarations: [
    CompanySearchComponent,
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
        component: CompanySearchComponent
      }
    ])
  ]
})

export class CompanySearchModule { }
