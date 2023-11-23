import { Component, Injector, ViewChild } from '@angular/core';
import { IonContent, IonInput, isPlatform } from '@ionic/angular';
import { Slide } from 'src/app/services/slider-image';
import Swiper, { SwiperOptions } from 'swiper';
import { Category } from '../../services/categories';
import { BasePage } from '../base-page/base-page';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss'],
})
export class CategoryListPage extends BasePage {

  @ViewChild(IonContent, { static: true }) container: IonContent;
  @ViewChild('txtSearchInput', { static: false }) txtSearchInput: IonInput;

  public categories: Category[] = [];

  public pathPrefix: string;
  public currentUrl: string;

  public slidesTop: Slide[] = [];
  public slidesBottom: Slide[] = [];

  public slideTopOpts: SwiperOptions = {
    pagination: false,
    navigation: false,
    autoplay: { delay: 4000, disableOnInteraction: false },
  };

  public slideBottomOpts: SwiperOptions = {
    pagination: false,
    navigation: false,
    autoplay: { delay: 4000, disableOnInteraction: false },
  };

  public swiperTop: Swiper;
  public swiperBottom: Swiper;

  CategoryTypeId: any;
  imagesForHome: any[];
  paidPromotionHomeImg: any;

  ImageCategoryTypeId: any;
  categoryTypesBycity: any[];
  viewcategories: any[];

  cityId: any;

  constructor(injector: Injector,
    private slideService: Slide,
    private categoryService: Category, private clientService: ClientService) {
    super(injector);
  }

  enableMenuSwipe() {
    return true;
  }

  ngOnInit() {

    this.cityId = localStorage.getItem('selectedCityId');

    const tab = this.activatedRoute.snapshot.parent.data.tab;

    if (tab === 'home') {
      this.pathPrefix = '../';
    } else if (tab === 'explore') {
      this.pathPrefix = './';
    }

    this.GetPaidPromotionForHome();
    this.GetAllCategoryList(28);
  }

  ionViewWillEnter() {

    if (this.container) {
      this.container.scrollToTop();
    }
  }

  async ionViewDidEnter() {
    if (!this.categories.length) {
      this.showLoadingView({ showOverlay: false });
      this.loadData();
    }

    const title = await this.getTrans('EXPLORE');
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

  async loadData() {

    try {

      this.categories = await this.categoryService.load();

      const slides: Slide[] = await this.slideService.load({
        page: 'categories',
      });

      this.slidesTop = slides.filter(slide => slide.position === 'top');
      this.slidesBottom = slides.filter(slide => slide.position === 'bottom');

      if (this.slidesTop.length > 1) {
        this.slideTopOpts.pagination = true;
        this.slideTopOpts.navigation = isPlatform('desktop');
      }

      if (this.slidesBottom.length > 1) {
        this.slideBottomOpts.pagination = true;
        this.slideBottomOpts.navigation = isPlatform('desktop');
      }

      if (this.categories.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }

      this.onRefreshComplete();

    } catch {
      this.showErrorView();
      this.onRefreshComplete();
    }
  }

  onReload(event: any = {}) {
    this.refresher = event.target;
    this.loadData();
  }

  onSubmitSearch(event: any) {
    if ((event.type === 'keyup' && event.key === 'Enter') || event.type === 'click') {
      this.navigateToRelative('./search', {
        q: this.txtSearchInput.value
      });
    }
  }

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

  getImageUrl() {
    // Specify the correct path to your image in the assets folder
    return '/assets/images/banner3.png';
  }

  // //Go to company list page
  goToListPage(category) {
    localStorage.setItem('categoryHeaderName',category.categoryName);
  }
}
