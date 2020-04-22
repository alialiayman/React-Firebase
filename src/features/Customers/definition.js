const definition = {
  name: 'Company',
  fields: [
    {name: 'Name', summary: 1},
    {name: 'NameArabic', summary: 2},
    {name: 'ContactPerson', summary: 3},
    {name: 'Nationality', summary: 4},
    {name: 'Tel', summary: 5, type: 'tel'},
    {name: 'CompanyId', summary: 6},
    {name: 'Comments', type: 'textarea'},
    {name: 'ExpireDate', type: 'date'},
    {name: 'KSATel', type: 'tel'},
  ],
  sqlFields: `Name	nvarchar
    NameArabic	nvarchar
    ContactPerson	nvarchar
    Address	nvarchar
    Email	varchar
    Website	varchar
    Tel	varchar
    CreateDt	datetime
    CompanyCode	varchar
    Comments	nvarchar
    IsOnHold	bit
    LogoUrl	varchar
    UserName	varchar
    UserEmail	varchar
    Password	varchar
    CompanyId	int
    ExpireDate	datetime
    KSATel	varchar
    MunazemNumber	varchar
    Nationality	nvarchar
    IsAdmin	bit
    WayToUmrahCompanyCode	varchar
    WayToUmrahAgentCode	varchar
    MOFAEmbassy	varchar
    MotawefNumber	varchar
    BabUmraUserName	varchar
    BabUmraPassword	varchar
    BabUmraEACode	varchar
    Quota	int
    IsHajOnSoftAgent	bit
    Feedback	varchar
    ehajusername	varchar
    ehajpassword	varchar
    gamausername	varchar
    gamapassword	varchar
    waytoumrahUserName	varchar
    waytoumrahPassword	varchar
    MotEgpUserName	varchar
    MotEgpPassword	varchar
    TawafUserName	varchar
    TawafPassword	varchar
    SaudiWakeelId	int
    GoogleSecret	varchar
    IsICanSupport	bit
    IsHeCanSupport	bit
    SupportTel	nvarchar
    waytoumrahemail	varchar
    waytoumrahemailpassword	varchar`
}
export default definition;