import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInput, IonSearchbar, ModalController, NavParams, isPlatform } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import Swiper, { SwiperOptions } from 'swiper';
import { Slide } from 'src/app/services/slider-image';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})

export class ProductDetailsComponent implements OnInit {

  @ViewChild(IonSearchbar, { static: true }) ionSearchBar: IonSearchbar;
  @ViewChild(IonContent, { static: true }) container: IonContent;
  @ViewChild('ionFabButton', { static: false, read: ElementRef }) ionFabButton: ElementRef;
  @ViewChild('txtSearchInput', { static: false }) txtSearchInput: IonInput;
 
  @HostListener('ionScroll', ['$event']) async onScroll($event: any) {

    const isScrollingDown = $event.detail.velocityY > 0;

    if (this.ionFabButton && isScrollingDown && !this.isIonFabHidden && !this.isAnimating) {

      this.isIonFabHidden = true;
      this.isAnimating = true;

      //this.animation.direction('normal').play();
    }

  }

  @HostListener('ionScrollEnd') async onScrollEnd() {

    if (this.ionFabButton && this.isIonFabHidden && !this.isAnimating) {

      this.isIonFabHidden = false;
      this.isAnimating = true;

      //this.animation.direction('reverse').play();
    }
  }

  @HostListener('window:popstate')
  onPopState() {
    if (isPlatform('android') && isPlatform('mobileweb')) {
      this.modalCtrl.dismiss();
    }
  }


  public isIonFabHidden = false;
  public isAnimating: boolean;
  public animation: Animation;

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

  preference: any = {
    currentTab: 'defaultTab', // Initialize with a default value
  };

  constructor(private navParams: NavParams,
    private clientService: ClientService, private zone: NgZone,
    private router: Router, private route: ActivatedRoute, protected modalCtrl: ModalController) {

  }

  ngOnInit() {
    // Access the data passed from the parent component
    this.productId = this.navParams.get('id');
    this.clientId = this.navParams.get('clientId');
    this.params.address = localStorage.getItem('currentLocation');

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

  onDismiss() {
    return this.modalCtrl.dismiss();
  }

}
