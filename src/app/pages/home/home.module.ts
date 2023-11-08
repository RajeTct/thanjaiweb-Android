import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home';
import { SharedModule } from '../../shared.module';
import { LocationSelectPageModule } from '../location-select/location-select.module';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { WalkthroughPageModule } from '../walkthrough/walkthrough.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    SwiperModule,
    WalkthroughPageModule,
    LocationSelectPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers: [Geolocation, NativeGeocoder],
  declarations: [HomePage]
})
export class HomePageModule { }
