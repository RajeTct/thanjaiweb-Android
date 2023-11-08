import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/auth-guard/auth.guard';
import { ProductSearchComponent } from '../pages/product-search/product-search.component';

const routes: Routes = [
  {
    path: '1',
    component: TabsPage,
    children: [

      {
        path: 'home',
        data: { tab: 'home' },
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'search',
            loadChildren: () => import('../pages/search/search.module').then(m => m.SearchPageModule)
          },
          {
            path: 'categories',
            loadChildren: () => import('../pages/category-list/category-list.module').then(m => m.CategoryListPageModule)
          },
          {
            path: 'places',
            loadChildren: () => import('../pages/place-list/place-list.module').then(m => m.PlaceListPageModule)
          },
          {
            path: 'places/map',
            loadChildren: () => import('../pages/map/map.module').then(m => m.MapPageModule)
          },
          {
            path: 'places/add',
            loadChildren: () => import('../pages/place-save/place-save.module').then(m => m.PlaceSavePageModule)
          },
          {
            path: 'places/:id/:slug/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'places/:id/:slug',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'posts/:id',
            loadChildren: () => import('../pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
          },
          {
            path: 'posts/:id/:slug',
            loadChildren: () => import('../pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
          },
          {
            path: 'product-search',
            loadChildren: () => import('../pages/product-search/product-search.module').then(m => m.ProductSearchModule)
          },
          {
            path: 'company-search',
            loadChildren: () => import('../pages/company-search/company-search.module').then(m => m.CompanySearchModule)
          },
          {
            path: 'all-events',
            loadChildren: () => import('../pages/all-events/all-events.module').then(m => m.AllEventsModule)
          },
          {
            path: 'all-blood-required',
            loadChildren: () => import('../pages/all-blood-required/all-blood-required.module').then(m => m.AllBloodRequiredModule)
          },
          {
            path: 'blood-required-detail',
            loadChildren: () => import('../pages/blood-required-detail/blood-required-detail.module').then(m => m.BloodRequiredDetailModule)
          },
          {
            path: 'event-detail',
            loadChildren: () => import('../pages/events-detail/events-detail.module').then(m => m.EventsDetailModule)
          },
          {
            path: 'all-lost-found',
            loadChildren: () => import('../pages/all-lost-found/all-lost-found.module').then(m => m.AllLostFoundModule)
          },
          {
            path: 'lost-found-detail',
            loadChildren: () => import('../pages/lost-found-detail/lost-found-detail.module').then(m => m.LostFoundDetailModule)
          },
          {
            path: 'product-detail',
            loadChildren: () => import('../pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
          },
          {
            path: 'all-company-details',
            loadChildren: () => import('../pages/all-company-details/all-company-details.module').then(m => m.AllCompanyDetailsModule)
          }
        ]
      },
      {
        path: 'explore',
        data: { tab: 'explore' },
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/category-list/category-list.module').then(m => m.CategoryListPageModule)
          },
          {
            path: 'search',
            loadChildren: () => import('../pages/search/search.module').then(m => m.SearchPageModule)
          },
          {
            path: 'places',
            loadChildren: () => import('../pages/place-list/place-list.module').then(m => m.PlaceListPageModule)
          },
          {
            path: 'places/add',
            loadChildren: () => import('../pages/place-save/place-save.module').then(m => m.PlaceSavePageModule)
          },
          {
            path: 'places/map',
            loadChildren: () => import('../pages/map/map.module').then(m => m.MapPageModule)
          },
          {
            path: 'places/:id/:slug/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'places/:id/:slug',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'posts/',
            loadChildren: () => import('../pages/post-list/post-list.module').then(m => m.PostListPageModule)
          },
          {
            path: 'posts/:id',
            loadChildren: () => import('../pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
          },
          {
            path: 'posts/:id/:slug',
            loadChildren: () => import('../pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
          },
        ]
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/post-list/post-list.module').then(m => m.PostListPageModule)
          },
          {
            path: 'search',
            loadChildren: () => import('../pages/search/search.module').then(m => m.SearchPageModule)
          },
          {
            path: 'places',
            loadChildren: () => import('../pages/place-list/place-list.module').then(m => m.PlaceListPageModule)
          },
          {
            path: 'places/add',
            loadChildren: () => import('../pages/place-save/place-save.module').then(m => m.PlaceSavePageModule)
          },
          {
            path: 'places/map',
            loadChildren: () => import('../pages/map/map.module').then(m => m.MapPageModule)
          },
          {
            path: 'places/:id/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id/:slug/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'places/:id/:slug',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
          },
          {
            path: ':id/:slug',
            loadChildren: () => import('../pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'help',
            loadChildren: () => import('../pages/about/about.module').then(m => m.AboutPageModule)
          },
          {
            path: 'pages/:id/:slug',
            loadChildren: () => import('../pages/page/page.module').then(m => m.PageViewModule)
          },
          {
            path: 'reviews',
            canActivate: [AuthGuard],
            loadChildren: () => import('../pages/review-user-list/review-user-list.module').then(m => m.ReviewUserListPageModule)
          },
          {
            path: 'likes',
            canActivate: [AuthGuard],
            loadChildren: () => import('../pages/favorite-list/favorite-list.module').then(m => m.FavoriteListPageModule)
          },
          {
            path: 'likes/:id',
            canActivate: [AuthGuard],
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'likes/:id/reviews',
            canActivate: [AuthGuard],
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places',
            canActivate: [AuthGuard],
            loadChildren: () => import('../pages/place-user-list/place-user-list.module').then(m => m.PlaceUserListPageModule)
          },
          {
            path: 'places/:id/edit',
            canActivate: [AuthGuard],
            loadChildren: () => import('../pages/place-save/place-save.module').then(m => m.PlaceSavePageModule)
          },
          {
            path: 'places/add',
            loadChildren: () => import('../pages/place-save/place-save.module').then(m => m.PlaceSavePageModule)
          },
          {
            path: 'places/:id/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id/:slug/reviews',
            loadChildren: () => import('../pages/review-list/review-list.module').then(m => m.ReviewListPageModule)
          },
          {
            path: 'places/:id',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
          {
            path: 'places/:id/:slug',
            loadChildren: () => import('../pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/1/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/1/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
