import { Component, Injector, ViewChild, NgZone } from '@angular/core';
import { IonContent, isPlatform } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { ReviewAddPage } from '../review-add/review-add';
import { Place } from '../../services/place-service';
import { User } from '../../services/user-service';
import { Review } from '../../services/review-service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { SharePage } from '../share/share.page';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Report } from 'src/app/services/report.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Share } from '@capacitor/share';
import { MapStyle } from 'src/app/services/map-style';

import { ClientService } from 'src/app/services/client.service';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blood-required-detail',
  templateUrl: './blood-required-detail.component.html',
  styleUrls: ['./blood-required-detail.component.scss'],
})
export class BloodRequiredDetailComponent extends BasePage {

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
  bloodRequiredDetails: any[];


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
    this.getBloodRequired();
  }

  async ionViewDidEnter() {
    if (!this.place) {
      this.showLoadingView({ showOverlay: false });
      this.loadPlace();
      this.loadLocation();
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

  onGalleryInit(photoSwipeInstance: any) {
    this.photoSwipe = photoSwipeInstance;
    this.isLightboxOpen = true;
  }

  onGalleryDestroy() {
    this.isLightboxOpen = false;
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

  async loadPlace() {

    // try {

    //   const appConfig = await this.appConfigService.load();

    //   if (appConfig && appConfig.reviews) {
    //     this.isReviewsEnabled = !appConfig.reviews.disabled;
    //   }

    //   this.place = await this.placeService.loadOne(this.getParams().id);

    //   if (this.place.longDescription) {
    //     this.description = this.sanitizer
    //       .bypassSecurityTrustHtml(this.place.longDescription);
    //   }

    //   if (this.place.images?.length > 1) {
    //       this.slideOpts.pagination = true;
    //       this.slideOpts.navigation = isPlatform('desktop');
    //   }

    //   this.setPageTitle(this.place.title);

    //   this.setMetaTags({
    //     title: this.place.title,
    //     description: this.place.description,
    //     image: this.place.image ? this.place.image.url() : '',
    //     slug: this.place.getSlug()
    //   });

    //   this.webSocialShare.share.config.forEach((item: any) => {
    //     if (item.whatsapp) {
    //       item.whatsapp.socialShareUrl = this.getShareUrl(this.place.getSlug());
    //     } else if (item.facebook) {
    //       item.facebook.socialShareUrl = this.getShareUrl(this.place.getSlug());
    //     } else if (item.twitter) {
    //       item.twitter.socialShareUrl = this.getShareUrl(this.place.getSlug());
    //     } else if (item.copy) {
    //       item.copy.socialShareUrl = this.getShareUrl(this.place.getSlug());
    //     }
    //   });

    //   this.rating = this.place.rating;

    //   if (User.getCurrent()) {
    //     this.checkIfIsLiked();
    //     this.checkIfIsStarred();
    //   }

    //   this.loadReviews();

    //   if (this.preference.isDarkModeEnabled) {
    //     this.mapStyles = MapStyle.darkStatic();
    //   }

    //   this.showContentView();
    //   this.onRefreshComplete(this.place);
    //   this.placeService.trackView(this.place);

    // } catch (err) {

    //   if (err.code === 101) {
    //     this.showEmptyView();
    //   } else {
    //     this.showErrorView();
    //   }

    //   this.onRefreshComplete();
    // }
  }

  async checkIfIsLiked() {
    try {
      const isLiked = await this.placeService.isLiked(this.place)
      this.isLiked = isLiked;
    } catch (err) {
      console.warn(err.message);
    }
  }

  async checkIfIsStarred() {
    try {
      const isStarred = await this.placeService.isStarred(this.place)
      this.isStarred = isStarred;
    } catch (err) {
      console.warn(err.message);
    }
  }

  async loadLocation() {
    try {
      const coords = await this.geolocationService.getCurrentPosition();
      this.location = coords;
    } catch (err) {
      console.warn(err);
    }
  }

  async loadReviews() {
    try {
      this.reviews = await this.reviewService.load({
        place: this.place, limit: 5
      });
    } catch (err) {
      console.warn(err.message);
    }
  }

  async openAddReviewModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: ReviewAddPage,
      componentProps: {
        place: this.place
      }
    });

    await modal.present();

    await this.dismissLoadingView();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.reviews.unshift(data);
    }
  }

  async openShareModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: SharePage,
    });

    await modal.present();

    await this.dismissLoadingView();

  }

  onLike() {
    this.isLiked = !this.isLiked;
    this.placeService.like(this.place);
  }

  onRate() {
    this.openAddReviewModal();
  }

  onContentTouched(ev: any = {}) {
    const href = ev.target.getAttribute('href');
    if (href) {
      ev.preventDefault();
      this.openUrl(href);
    }
  }

  async onWhatsAppTouched() {

    const placeUrl = this.getShareUrl(this.place.getSlug());
    const appName = await this.getTrans('APP_NAME');

    this.translate.get('WHATS_APP_SHARE_TEXT', {
      placeUrl: placeUrl,
      appName: appName,
    }).subscribe(str => {
      const url = `https://wa.me/${this.place.whatsapp}/?text=${encodeURIComponent(str)}`;
      this.openSimpleUrl(url);
    });

  } 


  getBloodRequired() {
    this.clientService.GetBloodRequiredById(this.id).subscribe(async (data: any) => {
      this.bloodRequiredDetails = data.data;
    });
  }
}
