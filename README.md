# YEG Neighbourhood Open Data Server - Background
This is a google apps script ("GAS") library that provides greatly simplified querying, error handling, and json data output for City of Edmonton Open Data that supports filtering based on neighbourhood.

**The queries in this library do not include all columns/fields in the original datasets. Some of the queries also provided aggregated views of the underlying dataset.**

The source of this data is the City of Edmonton Open Data Portal: [https://data.edmonton.ca](https://data.edmonton.ca).

# Coming Soon
YEG Neighbourhood Open Data Client - to provide a working example of a client that consumes and formats the output of this server.

## Getting Started
### ScriptProperties
This script uses two script properties:
- CACHE_DURATION: this is how long the data from the open data portal is cached by GAS.

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
- Age Ranges (2016 Census) - Data
- Age Ranges (2016 Census) - Chart - ImgSrc
- Dwelling Types (2014 Census) - Data
- Household Incomes (2016 Census) - Data
- Household Incomes (2016 Census) - Chart - ImgSrc
- Building Permits (Current Year-to-Date) - Data - Aggregated by Breed

### Environment
- Latitude, Longitude, Area - Data
- Road - Map - ImgSrc
- Terrain - Map - ImgSrc
- Satellite - Map - ImgSrc
- Hybrid - Map - ImgSrc
- Trees - Data - Aggregated By Species

### Services
- Snow Clearing Schedule - Data
- Sandboxes - Data

### Licences
- Dog Breeds - Data - Aggregated by Breed
- Cat Breeds - Data - Aggregated by Breed
- Pigeons - Data
- Bees and Hens - Data


## Bylaw Infractions, Accidents, Crimes
- Bylaw Infractions (Current Year-to-Date) - Data - Aggregated by Type
- Criminal Incidents (Current Year-to-Date) - Data - Aggregated by Type
