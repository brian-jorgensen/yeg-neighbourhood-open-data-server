# YEG Neighbourhood Open Data Server - Background
This is a google apps script that provides **greatly simplified** querying, error handling, and json data output for City of Edmonton Open Data that supports filtering based on neighbourhood.

**The queries in this library do not include all columns/fields in the original datasets. Some of the queries also provided aggregated views of the underlying dataset.**

The source of this data is the City of Edmonton Open Data Portal: [https://data.edmonton.ca](https://data.edmonton.ca).

# Coming Soon?
A related YEG Neighbourhood Open Data Client that provides an example of what the output can look like.

## Getting Started
### Using the library.
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
- Age Ranges (2016 Census) - Table
- Age Ranges (2016 Census) - Chart
- Dwelling Types (2014 Census) - Table
- Household Incomes (2016 Census) - Table
- Household Incomes (2016 Census) - Chart
- Building Permits (Current Year-to-Date) - Table

### Environment
- Latitude, Longitude, Area - Table
- Road - Map
- Terrain - Map
- Satellite - Map
- Hybrid - Map
- Trees - Table

### Services
- Snow Clearing Schedule - Table
- Sandboxes - Table

### Licences
- Dog Breeds - Table
- Cat Breeds - Table
- Pigeons - Table
- Bees and Hens - Table


## Bylaw Infractions, Accidents, Crimes
- Bylaw Infractions (Current Year-to-Date) - Table
- Criminal Incidents (Current Year-to-Date) - Table
