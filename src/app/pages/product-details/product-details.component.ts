import { Component, NgZone, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import Swiper, { SwiperOptions } from 'swiper';
import { Slide } from 'src/app/services/slider-image';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  clientId: any;

  productDetails = Array();
  productFiles = Array();
  todayDate: any;

  public swiperTop: Swiper;

  public slideTopOpts: SwiperOptions = {
    pagination: true,
    navigation: false,
    autoplay: { delay: 1500, disableOnInteraction: false },
  };

  public slidesTop: Slide[] = [];
  public params: any = {};

  constructor(private navParams: NavParams,
    private clientService: ClientService, private zone: NgZone,) { }

  ngOnInit() {
    // Access the data passed from the parent component
    this.productId = this.navParams.get('id');
    this.clientId = this.navParams.get('clientId');
    this.getProductPricingByProductId(this.clientId, this.productId);
  }


  onSwiperTopInitialized(swiper: Swiper) {
    this.swiperTop = swiper;
    this.swiperTop.update();
  }


  getProductPricingByProductId(clientId: any, productId: any) {
    this.clientService.GetProductPricingbyProductId(clientId, productId).subscribe(
      async (data: any) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        this.todayDate = mm + '/' + dd + '/' + yyyy;
        this.productDetails = data.data;
        
        for (let i = 0; i < this.productDetails.length; i++) {
          this.productFiles = data.data[i].productFiles;
        }
      });
  }

}
