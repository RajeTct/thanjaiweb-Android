import { BaseRouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';

const userAuthBaseUrl = `${environment.apiBaseUrl}api/`;
const baseUrl = `${environment.apiBaseUrl}api/v1/`;

export const apiUrl = {

  GetPaidPromotionForHome: `${baseUrl}Promotion/GetPaidPromotionForHome`,
  GetAllCategoryList: `${baseUrl}Generic/GetAllCategoryList`,
  GetAllClientBasicInfo: `${baseUrl}ClientBasicInfo/GetAllClientBasicInfo`,
  GetPaidPromotionForCategory: `${baseUrl}Promotion/GetPaidPromotionForCategory`,
  GetPaidPromotionClientByCategoryId: `${baseUrl}Promotion/GetPaidPromotionClientByCategoryId`,
  GetClientByCategoryTypeId: `${baseUrl}ClientBasicInfo/GetClientByCategoryTypeId`,
  GetFilesByClientId: `${baseUrl}ClientFiles/GetFilesByClientId`,

  //Get client details by passing customurl for detail page
  GetClientInfoByCustomUrl: `${baseUrl}ClientBasicInfo/GetClientInfoByClientCustomUrl`,
  GetAllCompanyTabList: `${baseUrl}Generic/GetAllCompanyTabList`,
  GetSubscriptionForNotification: `${baseUrl}ClientBasicInfo/GetSubscriptionForNotification`,
  GetAllCity: `${baseUrl}Lookup/GetAllCity`,
  GetAllProductListForGlobalSearch: `${baseUrl}Product/GetAllProductListForGlobalSearch`,

  GetContactInfoByClient: `${baseUrl}ClientDetailsInfo/GetContactInfoByClient`,

  //Blood Required
  GetAllBloodRequired: `${baseUrl}BloodRequired/GetAllBloodRequired`,
  GetBloodRequiredById: `${baseUrl}BloodRequired/GetBloodRequiredById`,

  //Events
  GetAllEvents: `${baseUrl}Events/GetAllEvents`,
  GetEventsByEventId: `${baseUrl}Events/GetEventsByEventId`,

  //Lost/Found
  GetAllLostFound: `${baseUrl}LostFound/GetAllLostFound`,
  GetLostFoundById: `${baseUrl}LostFound/GetLostFoundById`,

  //To get product details using productId
  GetProductPricingbyProductId: `${baseUrl}Inventory/GetProductPricingbyProductId`,

  //For tab
  GetAllProductListForTabSearch: `${baseUrl}Product/GetAllProductListForTabSearch`,
  GetProductHeaderListByClientId: `${baseUrl}Product/GetProductHeaderListByClientId`,
  GetProductByClientId: `${baseUrl}Product/GetProductByClientId`,

  //To get All Districts
  GetAllDistricts: `${baseUrl}Lookup/GetAllDistricts`,
}
