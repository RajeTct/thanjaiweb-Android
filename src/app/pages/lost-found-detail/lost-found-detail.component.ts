import { Component, Injector, ViewChild, NgZone } from '@angular/core';
import { IonContent, isPlatform } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';

import { Place } from '../../services/place-service';

import { Review } from '../../services/review-service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

import { GeolocationService } from 'src/app/services/geolocation.service';

import { AppConfigService } from 'src/app/services/app-config.service';
import { ClientService } from 'src/app/services/client.service';

import { ActivatedRoute } from '@angular/router';
import Swiper, { SwiperOptions } from 'swiper';
import { Slide } from 'src/app/services/slider-image';

@Component({
  selector: 'app-lost-found-detail',
  templateUrl: './lost-found-detail.component.html',
  styleUrls: ['./lost-found-detail.component.scss'],
})
export class LostFoundDetailComponent extends BasePage {

  @ViewChild(IonContent, { static: true }) container: IonContent;

  public apiKey: string = environment.googleMapsApiKey;

  public images = [];
  public place: Place;
  public description: any;
  public rating: number = 0;
  public isLiked: boolean = false;
  public isStarred: boolean = false;
  public location: any;
  public reviews: Review[] = [];

  public skeletonReviews: Array<any>;

  public isReviewsEnabled: boolean;

  public photoSwipe: any;
  public isLightboxOpen: boolean;
  public backButtonListener: any;

  public mapStyles: string;

  public slideOpts: any = {
    pagination: false,
    navigation: false,
  };

  id: any;
  eventTypeId: any;
  lostFoundArr: any[];
  lostFoundFiles: any[];

  public swiperTop: Swiper;

  public slideTopOpts: SwiperOptions = {
    pagination: true,
    navigation: false,
    autoplay: { delay: 1500, disableOnInteraction: false },
  };

  public slidesTop: Slide[] = [];
  public params: any = {};

  constructor(injector: Injector,
    private placeService: Place,
    private sanitizer: DomSanitizer,
    private geolocationService: GeolocationService,
    private reviewService: Review,
    private appConfigService: AppConfigService,
    private zone: NgZone, private clientService: ClientService,
    private route: ActivatedRoute) {
    super(injector);
    this.isReviewsEnabled = true;
    this.skeletonReviews = Array(5);
  }

  ngOnDestroy() {
    document.removeEventListener('ionBackButton', this.backButtonListener);
  }

  ngOnInit() {
    this.subscribeToBackButtonEvent();

    this.id = this.route.snapshot.queryParams.Id;
    var idFromQueryParams = this.id;
    this.id = idFromQueryParams.split('-')[0];
    this.eventTypeId = idFromQueryParams.split('-')[1];

    this.getLostFoundById();
  }


  onGalleryInit(photoSwipeInstance: any) {
    this.photoSwipe = photoSwipeInstance;
    this.isLightboxOpen = true;
  }

  onGalleryDestroy() {
    this.isLightboxOpen = false;
  }

  async ionViewDidEnter() {
    if (!this.place) {
      this.showLoadingView({ showOverlay: false });
    } else {
      this.setPageTitle(this.place.title);

      this.setMetaTags({
        title: this.place.title,
        description: this.place.description,
        image: this.place.image ? this.place.image.url() : '',
        slug: this.place.getSlug()
      });
    }
  }

  enableMenuSwipe() {
    return false;
  }

  subscribeToBackButtonEvent() {

    this.backButtonListener = (ev: CustomEvent) => {
      ev.detail.register(10, () => {

        this.zone.run(() => {
          if (this.isLightboxOpen) {
            this.photoSwipe.close();
          } else {
            this.goBack();
          }
        });

      });
    };

    document.addEventListener('ionBackButton', this.backButtonListener);
  }

  onSwiperTopInitialized(swiper: Swiper) {
    this.swiperTop = swiper;
    this.swiperTop.update();
  }

  async loadData() {

    try {

      const data: any = await Parse.Cloud.run('getHomePageData', this.params);

      const slides: Slide[] = data.slides || [];

      this.slidesTop = slides.filter(slide => slide.position === 'top');

      if (this.slidesTop.length > 1) {
        this.slideTopOpts.pagination = true;
        this.slideTopOpts.navigation = isPlatform('desktop');
      }

      this.onRefreshComplete();
      this.showContentView();

    } catch {

      this.showErrorView();
      this.onRefreshComplete();
      this.translate.get('ERROR_NETWORK')
        .subscribe(str => this.showToast(str));
    }
  }

  getLostFoundById() {
    this.clientService.GetLostFoundById(this.id).subscribe(async (data: any) => {
      for (var i = 0; i < data.data.length; i++) {
        this.lostFoundArr = data.data;
        this.lostFoundFiles = data.data[i].eventFiles;
      }
    });
  }

}
