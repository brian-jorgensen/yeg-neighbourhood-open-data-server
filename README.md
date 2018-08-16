# YEG Neighbourhood Open Data Server - Background
This is a google apps script ("GAS") library that provides greatly simplified querying, error handling, and json data output for City of Edmonton Open Data that supports filtering based on neighbourhood.

**The queries in this library do not include all columns/fields in the original datasets. Some of the queries also provided aggregated views of the underlying dataset.**

The source of this data is the City of Edmonton Open Data Portal: [https://data.edmonton.ca](https://data.edmonton.ca).

# Coming Soon
YEG Neighbourhood Open Data Client - to provide a working example of a client that consumes and formats the output of this server.

## Getting Started
### ScriptProperties
This script uses two script properties:
- CACHE_DURATION: this is how long the data from the open data portal is cached by GAS. If not configured, will default to 21600 seconds.
- APP_TOKEN: the Socrata app token. See [Socrata's website](https://dev.socrata.com/docs/app-tokens.html).

### Review Permissions
Client scripts will require users to allow them to 'Connect to an external service' (namely this library).

### Using it as a google apps script library.
This code will also be available as a google apps script library that can be included in other google apps script projects.

### Cloning the repo and pushing into your own google apps script project.
Please see instructions for using [clasp](https://github.com/google/clasp) to develop google apps script projects locally.

## Limitations
### Maps
The maps provided by this library are [Google Apps Script Maps](https://developers.google.com/apps-script/reference/maps/maps); they are static images that do not support dynamic features like pan and zoom.

### Charts
The charts provided by this library are [Google Apps Script Charts](https://developers.google.com/apps-script/reference/charts/); they are static images that are rendered server-side and do not support the dynamic features of client-side-rendered charts.

## Supported Datasets
### People, Homes, Incomes
- [Age Ranges](https://data.edmonton.ca/Census/2016-Census-Population-by-Age-Range-Neighbourhood-/phd4-y42v/data) (2016 Census) - Data
- [Age Ranges](https://data.edmonton.ca/Census/2016-Census-Population-by-Age-Range-Neighbourhood-/phd4-y42v/data) (2016 Census) - Chart - ImgSrc
- [Dwelling Types](https://data.edmonton.ca/Census/2014-Census-Population-By-Structure-Type-Neighbour/mtnp-ghdu/data) (2014 Census) - Data
- [Household Incomes](https://data.edmonton.ca/Census/2016-Census-Population-by-Household-Income-Neighbo/jkjx-2hix/data) (2016 Census) - Data
- [Household Incomes](https://data.edmonton.ca/Census/2016-Census-Population-by-Household-Income-Neighbo/jkjx-2hix/data) (2016 Census) - Chart - ImgSrc
- [Building Permits](https://data.edmonton.ca/Sustainable-Development/General-Building-Permits/24uj-dj8v/data) (Current Year-to-Date) - Data - Aggregated by `work_type`

### Environment
- [Latitude, Longitude, Area](https://data.edmonton.ca/City-Administration/City-of-Edmonton-Neighbourhoods-Centroid-Point-/3b6m-fezs/data) - Data
- [Road](https://data.edmonton.ca/Geospatial-Boundaries/City-of-Edmonton-Neighbourhood-Boundaries/jfvj-x253/data) - Map - ImgSrc
- [Terrain](https://data.edmonton.ca/Geospatial-Boundaries/City-of-Edmonton-Neighbourhood-Boundaries/jfvj-x253/data) - Map - ImgSrc
- [Satellite](https://data.edmonton.ca/Geospatial-Boundaries/City-of-Edmonton-Neighbourhood-Boundaries/jfvj-x253/data) - Map - ImgSrc
- [Hybrid](https://data.edmonton.ca/Geospatial-Boundaries/City-of-Edmonton-Neighbourhood-Boundaries/jfvj-x253/data) - Map - ImgSrc
- [Trees](https://data.edmonton.ca/Environmental-Services/Trees/eecg-fc54/data) - Data - Aggregated By `species`

### Services
- [Snow Clearing Schedule](https://data.edmonton.ca/Transportation/Residential-Snow-Clearing-Schedule/7gh5-bnbs/data) - Data
- [Sandboxes](https://data.edmonton.ca/Transportation/Sandboxes/ddqk-i2ey/data) - Data

### Licences
- [Dog Breeds](https://data.edmonton.ca/Community-Services/Pet-Licenses-by-Neighbourhood/5squ-mg4w/data) - Data - Aggregated by `breed`
- [Cat Breeds](https://data.edmonton.ca/Community-Services/Pet-Licenses-by-Neighbourhood/5squ-mg4w/data) - Data - Aggregated by `breed`
- [Pigeons](https://data.edmonton.ca/Community-Services/Pet-Licenses-by-Neighbourhood/5squ-mg4w/data) - Data
- [Hens and Bees](https://data.edmonton.ca/Community-Services/Hens-and-Bees/trz2-qkzs/data) - Data


## Bylaw Infractions, Accidents, Crimes
- [Bylaw Infractions](https://data.edmonton.ca/Community-Services/Bylaw-Infractions/xgwu-c37w/data) (Current Year-to-Date) - Data - Aggregated by `complaint`
- [Criminal Incidents](https://dashboard.edmonton.ca/dataset/EPS-Neighbourhood-Criminal-Incidents/xthe-mnvi/data) (Current Year-to-Date) - Data - Aggregated by `ucr_violation_type_group_incident`
