import { Component, Injector, ViewChild } from '@angular/core';
import { IonContent, IonInput, isPlatform } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import * as Parse from 'parse';
import { Category } from '../../services/categories';
import { Place } from '../../services/place-service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Slide } from 'src/app/services/slider-image';
import { LocationSelectPage } from '../location-select/location-select';
import { LocalStorage } from 'src/app/services/local-storage';
import { LocationAddress } from 'src/app/models/location-address';
import { WalkthroughPage } from '../walkthrough/walkthrough';
import { AppConfigService } from 'src/app/services/app-config.service';
import Swiper, { SwiperOptions } from 'swiper';
import { ClientService } from 'src/app/services/client.service';
import { IsValue } from 'src/app/_helper/enum';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { GeocoderResponse } from 'src/app/_helper/geocoder-response.model';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LookUp } from 'src/app/_models/look-up';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomePage extends BasePage {

  @ViewChild(IonContent, { static: true }) container: IonContent;

  @ViewChild('txtSearchInput', { static: false }) txtSearchInput: IonInput;

  public slidesTop: Slide[] = [];
  public slidesBottom: Slide[] = [];

  public featuredPlaces: Place[] = [];
  public newPlaces: Place[] = [];
  public nearbyPlaces: Place[] = [];

  public categories: Category[] = [];

  public params: any = {};

  public slideTopOpts: SwiperOptions = {
    pagination: true,
    navigation: false,
    autoplay: { delay: 4000, disableOnInteraction: false },
  };

  public slideBottomOpts: SwiperOptions = {
    pagination: false,
    navigation: false,
    autoplay: { delay: 4000, disableOnInteraction: false },
  };

  public skeletonArray: any[];

  public location: any;

  public swiperTop: Swiper;
  public swiperBottom: Swiper;

  paidPromotionHomeImg: any;
  imagesForHome!: any[];
  categoryTypesBycity!: any[];
  ImageCategoryTypeId: any;
  viewcategories!: any[];
  clientBasicInfo!: any[];
  colors: string[] = ['lightpink', 'lightblue', 'lightgreen', 'lightyellow', 'lavender'];
  searchKeyword: any;
  IsFlag: number;
  clientCategoryTypeId: any;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  mapZoom = 15;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  geocoderWorking = false;
  geolocationWorking = false;

  address: string;
  formattedAddress?: string | null = null;
  locationCoords?: google.maps.LatLng | null = null;
  filteredCity: any;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  cities: LookUp[];
  selectedCity: any;

  constructor(injector: Injector,
    private localStorage: LocalStorage,
    private geolocationService: GeolocationService,
    private appConfigService: AppConfigService, private clientService: ClientService,
    private geocodingService: GeocodingService) {
    super(injector);
    this.skeletonArray = Array(6);
    this.params.unit = this.preference.unit;
    this.GetAllClientBasicInfo();
    this.GetPaidPromotionForHome();
    this.GetAllCategoryList(28);
    this.getCurrentLocation();
  }

  enableMenuSwipe(): boolean {
    return false;
  }

  async ionViewDidEnter() {
    const title = await this.getTrans('HOME');
    this.setPageTitle(title);

    this.setMetaTags({
      title: title
    });

    this.swiperTop?.autoplay.stop();
    this.swiperTop?.autoplay.start();
    this.swiperTop?.update();

    this.swiperBottom?.autoplay.stop();
    this.swiperBottom?.autoplay.start();
    this.swiperBottom?.update();
  }

  ionViewWillEnter() {
    this.container?.scrollToTop();
  }

  async ngOnInit() {

    this.clientService.GetAllDistricts().subscribe(
      async (data: any) => {
        this.cities = data;
      }
    );
   
  }


  onLogoTouched() {
    this.container.scrollToTop(300);
  }

  onPlaceTouched(place: Place) {
    this.navigateToRelative('./places/' + place.id + '/' + place.slug);
  }

  // async onPresentLocationSelectModal() {

  //   await this.showLoadingView({ showOverlay: true });

  //   const modal = await this.modalCtrl.create({
  //     component: LocationSelectPage,
  //   });

  //   await modal.present();

  //   this.dismissLoadingView();

  //   const { data } = await modal.onDidDismiss();

  //   if (data) {

  //     const location: LocationAddress = {
  //       address: data.formatted_address,
  //       latitude: data.geometry.location.lat(),
  //       longitude: data.geometry.location.lng(),
  //     };

  //     this.navigateToRelative('./places', {
  //       latitude: location.latitude,
  //       longitude: location.longitude,
  //       address: location.address,
  //     });
  //   }
  // }

  onSlideTouched(slide: Slide) {

    if (slide.url && slide.type === 'url') {
      this.openUrl(slide.url);
    } else if (slide.place && slide.type === 'place') {
      this.navigateToRelative('./places/' + slide.place.id + '/' + slide.place.slug);
    } else if (slide.post && slide.type === 'post') {
      this.navigateToRelative('./posts/' + slide.post.id + '/' + slide.post.slug);
    } else if (slide.category && slide.type === 'category') {
      this.navigateToRelative('./places', {
        cat: slide.category.id
      });
    } else {
      // no match...
    }
  }

  onSubmitSearch(event: any) {
    if ((event.type === 'keyup' && event.key === 'Enter') || event.type === 'click') {
      this.navigateToRelative('./search', {
        q: this.txtSearchInput.value
      });
    }
  }

  onSwiperTopInitialized(swiper: Swiper) {
    this.swiperTop = swiper;
    this.swiperTop.update();
  }

  onSwiperBottomInitialized(swiper: Swiper) {
    this.swiperBottom = swiper;
    this.swiperBottom.update();
  }

  //Get Image for  carousel on top of the page
  GetPaidPromotionForHome() {
    this.clientService.GetPaidPromotionForHome().subscribe(
      async (data: any) => {
        this.paidPromotionHomeImg = data.data.length;

        if (data.data.length > 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].promotionFiles.length === 0) {
              data.data[i].promotionFiles = [
                {
                  filePathwithExtension: '/assets/images/banner3.png',
                },
              ];
            }
          } this.imagesForHome = data.data;
        } else {
          this.imagesForHome = [
            {
              promotionFiles: [
                {
                  filePathwithExtension: '/assets/images/banner3.png',
                },
              ],
            },
          ];
        }
      });
  }

  GetAllCategoryList(cityId: any) {
    this.clientService.GetAllCategoryList(cityId).subscribe(
      async (data: any) => {
        if (cityId != undefined) {
          for (var i = 0; i < data.data.length; i++) {
            this.ImageCategoryTypeId = data.data[i].categoryTypeId;
            this.categoryTypesBycity = data.data;
            this.viewcategories = data.data;
            if (data.data[i].categoryfiles.length == 0) {
              var Object = {
                filePathwithExtension: '/assets/images/banner3.png',
              };
              data.data[i].categoryfiles.push(Object);
            }
          }
          if (data.data.length == 0) {
            this.categoryTypesBycity = [];
          }
        }
      });
  }

  GetAllClientBasicInfo() {
    this.IsFlag = IsValue.parameterized; //For default method flag value 1;
    this.searchKeyword = IsValue.EmptysearchKey; //For default method search keyword empty

    this.clientService.GetAllClientBasicInfo(28, this.IsFlag, this.searchKeyword).subscribe(
      async (data: any) => {
        this.clientBasicInfo = data.data;

        for (var i = 0; i < data.data.length; i++) {
          // let files = data.data[i].files.filter((data: any) => {
          //   return data.filesTypeId == 8;
          // })

          // Object.assign(this.clientBasicInfo[i], {
          //   files: files
          // })
          this.clientCategoryTypeId = data.data[i].categoryTypeId;
        }
      });
  }

  //To check FileTypeId(ClientThumbNail)
  checkFileType(files: any[]): number {
    const fileType = files.find(file => file.filesTypeId === 8);
    return fileType ? fileType.filesTypeId : -1;
  }

  //To return FilePathWithExtension
  getFilePath(files: any[]): string {
    const fileType = files.find(file => file.filesTypeId === 8);
    const filePath = fileType ? fileType.filePathwithExtension : '';
    return filePath;
  }

  //Used to get company default color
  getCardColorSearch(product: any): string {
    const index = this.clientBasicInfo.indexOf(product);
    const colorIndex = index % this.colors.length;
    return this.colors[colorIndex];
  }


  getStatusColor(status: string) {
    if (status === 'Pending' || status === 'Pending Approval') {
      return 'warning';
    } else if (status === 'Approved') {
      return 'success';
    } else if (status === 'Rejected') {
      return 'danger';
    } else if (status === 'Expired') {
      return 'medium';
    }
  }

  GetClientByCategoryTypeId(item: any) {
    localStorage.setItem('CategoryTypeId', item.categoryId);
    localStorage.setItem('categoryHeaderName', item.categoryName);
  }


  getCurrentLocation() {
    this.geolocationWorking = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocationWorking = false;

        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,

        };
        //this.displayLocation(position.coords.latitude, position.coords.longitude)
        this.geocoderWorking = true;
        this.geocodingService.geocodeLatLng(point).then((response: GeocoderResponse) => {
          if (response.status === 'OK' && response.results?.length) {
            const value = response.results[0];

            this.params.address = value.formatted_address;

            // Find the 'locality' type in the address components
            const districtComponent = value.address_components.find(component => component.types.includes('locality'));

            // Extract the district value if found
            if (districtComponent) {
              const district = districtComponent.long_name;
              this.selectedCity = district;            
              // You can now use the 'district' variable wherever you need it in your code
            } else {
              alert('District not found in the address components.');
            }

            this.filteredCity = this.cities.filter(data => {
              return data.value == this.selectedCity;
            })
           
            localStorage.setItem('selectedCityId', this.filteredCity[0].key);
            localStorage.setItem('currentLocation', this.selectedCity);
            this.params.address = this.selectedCity;

            this.locationCoords = new google.maps.LatLng(point);

            this.mapCenter = new google.maps.LatLng(point);
            this.map.panTo(point);

            this.markerInfoContent = value.formatted_address;

            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };
          } else {
            alert(response.error_message);
          }
        })
          .finally(() => {
            this.geocoderWorking = false;
          });
      },
      (error) => {
        this.geolocationWorking = false;

        if (error.PERMISSION_DENIED) {
          alert("Couldn't get your location");
        } else if (error.POSITION_UNAVAILABLE) {
          alert("Couldn't get your location");
        } else if (error.TIMEOUT) {
          alert("Couldn't get your location");
        } else {
          alert(error.message);
        }
      },
      { enableHighAccuracy: true }
    );
  }

  // displayLocation(latitude: any, longitude: any) {
  //   var geocoder;
  //   geocoder = new google.maps.Geocoder();
  //   var latlng = new google.maps.LatLng(latitude, longitude);

  //   geocoder.geocode(
  //     { 'latLng': latlng },
  //     function (results: any, status: any) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         if (results[0]) {
  //           var add = results[0].formatted_address;
  //           // this.formattedAddress = results[0].formatted_address;
  //           //this.params.address = results[0].formatted_address;
  //           var value = add.split(",");

  //           var count = value.length;
  //           var country = value[count - 1];
  //           var state = value[count - 2];
  //           var city = value[count - 3];
  //         }
  //       }
  //     });
  // }

  //Used to navigate all-company-details
  goToCompanyDetails() {
    this.router.navigateByUrl('/1/home/all-company-details');
  }
}
