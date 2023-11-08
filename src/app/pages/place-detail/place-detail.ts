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
  selector: 'app-place-detail',
  templateUrl: './place-detail.html',
  styleUrls: ['./place-detail.scss']
})

export class PlaceDetailPage extends BasePage {

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

  public webSocialShare: { show: boolean, share: any, onClosed: any } = {
    show: false,
    share: {
      config: [{
        facebook: {
          socialShareUrl: '',
        },
      }, {
        twitter: {
          socialShareUrl: '',
        }
      }, {
        whatsapp: {
          socialShareText: '',
          socialShareUrl: '',
        }
      }, {
        copy: {
          socialShareUrl: '',
        }
      }]
    },
    onClosed: () => {
      this.webSocialShare.show = false;
    }
  };

  public slideOpts: any = {
    pagination: true,
    navigation: false,
  };

  arrLogoFiles = Array();
  arrBannerFiles = Array();
  arrGalleryFiles = Array();
  filesInfoType!: any[];
  bannerFilesLength: any;
  filesLength: any;
  logoFilesLength: any;
  subscriptionTypeId: any;
  arrGalleryFilesLength: any;
  clientId: any;
  isVerify: any;
  items: any;

  customUrl: any;
  id: any;
  clientBasicInfo: any[];
  clientTabType: any;
  tabRes: any[];
  subscriptionDetails: any[];
  SubscriptionApproval = false;
  timer: any;

  contacts: any[];
  phoneNumberArray = Array();
  LandlineArray: any[];
  EmailArray: any[];
  WebURLArray: any[];
  searchKeyword: any;
  getAllProductListForTab: any[];
  productsWithHeader: any[];

  colors: string[] = ['lightpink', 'lightblue', 'lightgreen', 'lightyellow', 'lavender'];

  products: any;
  withoutHeaderProducts: any[];
  withHeaderProducts: [];

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

    this.id = this.route.snapshot.paramMap.get('id');

    this.customUrl = this.id;

    this.clientService.GetClientInfoByClientCustomUrl(this.customUrl).subscribe(
      async (data: any) => {

        if (data.data[0].isVerify) {
          this.isVerify = data.data[0].isVerify;
        }

        // if (data.data.length == 0) {
        //   this.noRecords = true;
        // } else {
        //   this.progressBar = true;
        // }

        this.clientBasicInfo = data.data;
        this.clientId = data.data[0].clientId;

        for (var i = 0; i < data.data.length; i++) {
          this.clientTabType = data.data[i].clientTabType;
        }

        this.timer = setTimeout(() => {
          this.getFiles();
          this.getContact();
          this.getAllProductListForTabSearch();
          this.getProductHeaderByClientId(this.clientId);
          this.getProductByClientId(this.clientId);
        }, 1500);

      });
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

  async onShare() {

    if (this.isCapacitor) {

      try {
        const url = this.getShareUrl(this.place.getSlug());

        await Share.share({
          url: url,
        });

      } catch (err) {
        console.warn(err)
      }

    } else if (this.isPwa || this.isMobile) {
      this.webSocialShare.show = true;
    } else {
      this.openShareModal();
    }

  }

  async onCall() {
    this.openSimpleUrl('tel:' + this.place.phone);
    this.placeService.trackCall(this.place);
  }

  async onDirectionsButtonTouched() {

    const lat = this.place.location.latitude;
    const lng = this.place.location.longitude;

    const url = `https://maps.google.com/maps?q=${lat},${lng}`;

    this.openSimpleUrl(url);
  }

  async onReportButtonTouched() {

    const str = await this.getTrans([
      'REPORT_LISTING', 'REPORT_REASON',
      'CONFIRM', 'DISMISS'
    ]);

    const { value: text } = await this.showSweetTextArea(
      str.REPORT_PROFILE,
      str.REPORT_REASON,
      str.CONFIRM,
      str.DISMISS
    );

    if (text) {

      try {

        const report = new Report;
        report.place = this.place;
        report.reason = text as string;

        await report.save();

        this.translate.get('SENT')
          .subscribe(str => this.showToast(str));

      } catch (error) {
        // this.translate.get('ERROR_NETWORK')
        //   .subscribe(str => this.showToast(str));
      }

    }
  }

  getFiles() {
    this.clientService.GetFilesByClientId(this.clientId).subscribe(
      async (data: any) => {
        this.filesInfoType = data.data;
        this.filesLength = data.data.length;
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].filesTypeId == 1) {
            if (this.subscriptionTypeId != 1) {
              this.arrLogoFiles = data.data[i].file;
            }
            this.logoFilesLength = data.data[i].file.length;
          }
          else if (data.data[i].filesTypeId == 2) {
            this.bannerFilesLength = data.data[i].file.length;
            if (this.subscriptionTypeId != 1 && this.isVerify == 1) {
              this.arrBannerFiles = data.data[i].file;
            }
          }
          else if (data.data[i].filesTypeId == 3) {
            this.arrGalleryFiles = data.data[i].file;

            this.items = this.arrGalleryFiles.map(
              (item) =>
                new ImageItem({
                  src: item.filePathwithExtension,
                  thumb: item.filePathwithExtension,
                })
            );
            this.arrGalleryFilesLength = data.data[i].file;

          }
        }

        if (this.subscriptionTypeId == 1 || this.bannerFilesLength == null) {
          this.arrBannerFiles = [
            {
              filePathwithExtension: '/assets/images/banner3.png',
            },
          ];
        }

        if (this.logoFilesLength == null || this.subscriptionTypeId == 1 || this.isVerify != 1) {
          this.arrLogoFiles = [
            {
              filePathwithExtension: '/assets/images/Thanjaiweb-logo.png',
            },
          ];
        }
      });
  }

  getallTabSetting() {
    this.clientService.GetAllCompanyTabList().subscribe(async (data: any) => {
      this.tabRes = data.data;

      if (this.subscriptionTypeId == undefined) {
        this.getSubscription();
        this.getallTabSetting()
      } else if (this.subscriptionTypeId && this.SubscriptionApproval == false) {
        for (var i = 0; i < data.data.length; i++) {
          if (this.subscriptionTypeId == data.data[i].subcriptionTypeId) {
            // this.overView = data.data[i].overView;
            // this.product = data.data[i].product;
            // this.address = data.data[i].addressInfo;
            // this.contact = data.data[i].contactInfo;
            // this.galleryImages = data.data[i].gallery;
            // this.workingHours = data.data[i].workingHours;
            // this.socialMedia = data.data[i].socialMedia;
            // this.enquiry = data.data[i].enquiry;
            // this.youtubeVideo = data.data[i].youtubeVideo;
            // //For approved companys
            // this.mattab = true;
            // //For subscription not approved companies - Subscription Approval admin
            // this.SubscriptionApproval = false;
          }
        }
      }

    });
  }

  getSubscription() {
    //Get method for subscription type based on CLIENTID
    this.clientService.GetSubscriptionForNotification(this.clientId).subscribe({
      next: (data: any) => {
        this.subscriptionDetails = data.data;
        if (data.data.length > 0) {
          this.subscriptionTypeId = data.data[0].subcriptionTypeId;
          this.SubscriptionApproval = false;
        } else {
          this.SubscriptionApproval = true;
          this.subscriptionTypeId = 0
        }
      },
    });
  }

  getContact() {
    this.clientService.getContactInfo(this.clientId, 1).subscribe({
      next: (data: any) => {
        this.contacts = data.data;

        this.phoneNumberArray = this.contacts.filter((data: any) => {
          return data.contactType == 1;
        });

        this.LandlineArray = this.contacts.filter((data: any) => {
          return data.contactType == 2;
        });

        this.EmailArray = this.contacts.filter((data: any) => {
          return data.contactType == 3;
        });

        this.WebURLArray = this.contacts.filter((data: any) => {
          return data.contactType == 4;
        });
      },
    });
  }

  getAllProductListForTabSearch() {
    if (this.searchKeyword) {
      this.searchKeyword = '';
    }

    this.clientService.GetAllProductListForTabSearch(this.searchKeyword, this.clientId).subscribe(
      async (data: any) => {
        this.getAllProductListForTab = data.data;
      });
  }

  //Get product header using ClientId
  getProductHeaderByClientId(clientId) {
    this.clientService.GetProductHeaderListByClientId(clientId).subscribe(
      async (data: any) => {
        for (var i = 0; i < data.data.length; i++) {
          this.productsWithHeader = data.data;
        }
      });
  }

  //Used to get color for product name
  getCardColor(product: any): string {
    const index = this.withoutHeaderProducts.indexOf(product);
    const colorIndex = index % this.colors.length;
    return this.colors[colorIndex];
  }

  getProductByClientId(clientId) {
    this.clientService.GetProductByClientId(clientId, 1).subscribe(
      async (data: any) => {
        this.products = data.data;

        //For with header product length
        this.withHeaderProducts = this.products.filter(function (product: any) {
          return product.productHeaderId != 0;
        });

        //header product length to avoid html content-box class if length 0
        //For without header products
        this.withoutHeaderProducts = this.products.filter(function (product: any) {
          return product.productHeaderId == 0;
        });
      });
  }


}
