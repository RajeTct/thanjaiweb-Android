export class GlobalConstants {
  //Snackbar duration
  //Confirm dialog width
  public static width: string = '350px';
  //Reject reason pop-up width
  public static rejectPopupWidth: string = '40%';
  //success popup height and width
  public static modalDialogHeight: string = "45%";
  public static modalDialogWidth: string = "30%";
  public static paymentWidth: string = "40%";
  public static matbuttoncolor: string = 'primary';
  //seemore
  public static maxlength: number = 130;
  //paginator
  public static pageSizeOptions: any[] = [50,100,150];
  //No results found
  public static Nodata: string = 'No records found';
  public static Novalue: string = '---';
  //Images for Icon
  public static edit: string = 'assets/images/Icons/edit/editimg.png';
  public static delete: string = 'assets/images/Icons/edit/delete.png';
  public static view: string = 'assets/images/Icons/edit/view.png';
  public static noview: string = 'assets/images/Icons/edit/noview.png';
  public static nodelete: string = 'assets/images/Icons/edit/cannotdelete.png';
  public static downloaded: string = 'assets/images/Icons/download/download.png';
  public static Notdownloaded: string = 'assets/images/Icons/download/dow.png';
  public static ViewContactRequest: string = 'assets/images/Icons/Contact icons/viewContact.png';
  public static helper: string = 'assets/images/Helper/help.png';
 
  public static salesTypes =[{
    
      key: 1,
      value: 'Pos',
    
  }]

  public static Qualification = [
    {
   key:1,
   value:'SSLC'
  },
  {
    key:2,
    value:'HSC'
   },
   {
    key:3,
    value:'UG'
   },
   {
    key:4,
    value:'PG'
   },

]

public static University = [
  {
 key:1,
 value:'Annamalai university'
},
{
  key:2,
  value:'Anna university'
 },
 {
  key:3,
  value:'Bharathidasan university'
 },
 {
  key:4,
  value:'University of madras'
 },

]
public static Specialization = [
  {
 key:1,
 value:'BSC'
},
{
  key:2,
  value:'BE/B.Tech'
 },
 {
  key:3,
  value:'BCA'
 },
 {
  key:4,
  value:'MCA'
 },
 {
  key:5,
  value:'ME/M.Tech'
 },
 {
  key:6,
  value:'MBA'
 },
 {
  key:7,
  value:'B.Com'
 },

 {
  key:8,
  value:'Others'
 },
]
public static Board  = [
  {
 key:1,
 value:'State'
},
{
  key:2,
  value:'Central'
 },

]
public static PassingYear = [
  {
 key:1,
 value:'2021-2022'
},
{
  key:2,
  value:'2020-2021'
 },
 {
  key:3,
  value:'2019-2020'
 },
 {
  key:4,
  value:'2018-2019'
 },
 {
  key:4,
  value:'2017-2018'
 },
]

public static Experience = [
  {
 key:1,
 value:'1'
},
{
  key:2,
  value:'2'
 },
 {
  key:3,
  value:'3'
 },
 {
  key:4,
  value:'4'
 },
 {
  key:5,
  value:'5'
 },
]

public static NoticePeriod = [
  {key:1,
    value:'Immediate'},

  {key:2,
  value:'15 days'},
  {key:3,
    value:'1 month'},
 {key:4,
      value:'2 month'},
 {key:5,
        value:'3 month'},
   {key:6,
      value:'More'},
]

public static Department = [
  {key:1,
    value:'IT and Consulting'},

]

public static AnnualIncome = [
  {key:1,
  value:'1 LPA'},
  {key:2,
    value:'2 LPA'},
    {key:3,
      value:'3 LPA'},
      {key:4,
        value:'4 LPA'},
        {key:5,
          value:'5 LPA'},

]


public static preferredLocation = [
  {key:1,
    value:'Chennai'},
    {key:2,
      value:'Coimbatore'},
      {key:3,
        value:'Bangalore'},
        {key:4,
          value:'Trichy'},
]


public static preferredRole = [
  {key:1,
    value:'Front end developer'},
    {key:2,
      value:'.NET developer'},
      {key:3,
        value:'Backend developer'},
        {key:4,
          value:'SQL developer'},
]

public static preferredSalary = [
  {key:1,
    value:'2 LPA'},
    {key:2,
      value:'3 LPA'},
      {key:3,
        value:'4 LPA'},
        {key:4,
          value:'5 LPA'},
]

public static preferredShift = [
  {key:1,
    value:'Day'},
    {key:2,
      value:'Night'},
    
]

public static JobType = [
  {key:1,
    value:'Permanent'},
    {key:2,
      value:'Contractual'},
  
]
public static EmploymentType = [
  {key:1,
  value:'Full-time'},
  {key:2,
    value:'Part-time'},
]

public static Education = [
  {name:'PG',
  type:1,
  select:1
  
  },
 {name:'UG',
 type:1,
 select:2
 },
 {name:'HSC',
 type:2,
 select:3
  },
 {name:'SSLC',
 type:2,
 select:4
 },            
]


public static AvailableJobs = [
  {
    jobName:'Software developer',
    area:'Chennai',
    companyName:'Thanjai cloud technologies',
    Work:'Remote'
  },
  {
    jobName:'Angular developer',
    area:'Bangalore',
    Work:'On-site',
    companyName:'TATA Consultancy',
  },
  {
    jobName:'Java developer',
    area:'Trichy',
    Work:'Hybrid',
    companyName:'Infosys',
  },    
]
}