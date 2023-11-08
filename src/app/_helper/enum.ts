//company approval
export enum Approval {
  pending,
  approve,
  reject
}

export enum Role {
  User = 'User',
  SuperAdmin = 'SuperAdmin',
  Sales ='Sales'
}

//filterstatus of checkboxes
export enum Filter {
  all = "0,1,2",
  pending = "1",
  approve = "2",
  reject = ",",
  empty = ""
}

//EventtypeId
export enum EventTypeId {
  event = 1,
  lostFound,
  BloodRequired,
  EventValue = '1',
  LostValue = '2',
  BloodValue = '3',
}

//setting flag values for localstorage 
export enum Company {
  edit = '1',
  add = '2',
  subscription = '1',
  promotion = '2'
}

//setting flag values for default and parameterized list
export enum IsValue {
  default,
  parameterized,
  EmptysearchKey = 0,
}

export enum IsShowContact {
  // To view contact request count only
  ViewCount,
  // To view their details only
  ViewDetail
}

//setting values for admin and public user
export enum EventsUserType {
  admin = '1',
  user = '2'
}

export enum IsPromotionType {
  //Banner image page
  banner,
  //add promotion page
  all,
}

export enum SocialMediaId {
  faceBook = 1,
  twitter
}

export enum KEY_CODES {
  Space = 32,
  ctrl = 17,
  enter = 13
}