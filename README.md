# DataProcessing
### Eind opdracht Data-processing

In dit bestand wordt de volledige API uitgelegd en hoe u hem moet installeren op uw huidige apparaat.

## Installeren 

Install express
> <code>npm install express</code>

Install ajv validator
> <code> npm install ajv </code>

Install mysql

> <code> npm install mysql </code>

Na het installeren kunnen we in de terminal het volgende typen:
> <code>node app.js</code>

Als alles goed verloopt zien we geen errors en staat de API op scherp. <Strong>Vergeet niet de Git repo te clonen!</strong>

# Database importing

De database export staat in de map "database info\database exports\income_per_country.sql"

Deze SQL file kunt u importeren in uw SQL interface applicatie.

<strong>In het huidige project is er gebruik gemaakt van SQL Workbench 8.0 CE</strong>

URL: https://dev.mysql.com/downloads/workbench/

### Database configuratie

De volgende configuratie is nodig om MYSQL te verbinden met uw SQL interface:

``` javascript
const conn = mysql.createConnection(
    {
        host: '127.0.0.1', //change this to your OWN localhost
        user: 'root',   //  OWN root
        password: '1234', // OWN password
        database: 'income_per_country'  // Doesn't need any change
    });
```

<strong>!De blok van code bevind zich in de file CRUD.js boven aan pas dit aan naar uw eigen gegevens!</strong>

# Endpoints and formats :

Hier onder bevinden zich alle routes/endpoints die de API bevat.

## GNI male routes

Get all data

> Endpoint: http://localhost:3000/GNImale/allData
>
> <code>GET</code>

Get data from one country

> Endpoint: http://localhost:3000/GNImale/singleRecord
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> [{
> 
>   "Country": "Albania"
> 
> }]
> ```

Update data from one country

> Endpoint: http://localhost:3000/GNImale/updateCountry
>
> <code>PUT</code>
>
> JSON Format : 
>
> ```javascript
> {
>       "country":  "Albania",
>       "data": 
>           {
>               "2000": 7219,
>               "2010": 7219,// optioneel
>               "2015": 7219,// optioneel
>               "2018": 7219 // optioneel
>               
>           }
>   }
> ```

Add a country

> Endpoint: http://localhost:3000/GNImale/addCountry
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> [{
>   "Country": "Albania"
> }]
> ```

Delete a country

> Endpoint: http://localhost:3000/GNImale/deleteCountry/:id
>
> <code>DELETE</code>
>
> JSON Format : 
>
> ```javascript
> // no json is being send but instead given as PARAMETER
> // @parameter : :id
> --------------------------------------------------------
> // Examples : 
> //	http://localhost:3000/GNImale/deleteCountry/Albania
> //	http://localhost:3000/GNImale/deleteCountry/Armenia
> //	http://localhost:3000/GNImale/deleteCountry/Cyprus
> 
> 
> 	
> ```

## GNI Female routes

Get all data

> Endpoint: http://localhost:3000/GNIFemale/allData
>
> <code>GET</code>

Get data from one country

> Endpoint: http://localhost:3000/GNIFemale/singleRecord
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> [{
> 
>   "Country": "Albania"
> 
> }]
> ```

Update data from one country

> Endpoint: http://localhost:3000/GNIFemale/updateCountry
>
> <code>PUT</code>
>
> JSON Format : 
>
> ```javascript
> {
>       "country":  "Albania",
>       "data": 
>           {
>               "2000": 7219,
>               "2010": 7219,// optioneel
>               "2015": 7219,// optioneel
>               "2018": 7219 // optioneel
>               
>           }
>   }
> ```

Add a country

> Endpoint: http://localhost:3000/GNIFemale/addCountry
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> [{
>   "Country": "Albania"
> }]
> ```

Delete a country

> Endpoint: http://localhost:3000/GNIFemale/deleteCountry/:id
>
> <code>DELETE</code>
>
> JSON Format : 
>
> ```javascript
> // no json is being send but instead given as PARAMETER
> // @parameter : :id
> --------------------------------------------------------
> // Examples : 
> //	http://localhost:3000/GNImale/deleteCountry/Albania
> //	http://localhost:3000/GNImale/deleteCountry/Armenia
> //	http://localhost:3000/GNImale/deleteCountry/Cyprus
> 
> 
> 	
> ```

## GNI per Capita routes

Get all data

> Endpoint: http://localhost:3000/GNIPerCapita/allData
>
> <code>GET</code>

Get data from one country

> Endpoint: http://localhost:3000/GNIPerCapita/singleRecord
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> [{
> 
>   "Country": "Albania"
> 
> }]
> ```

Update data from one country

> Endpoint: http://localhost:3000/GNIPerCapita/updateCountry
>
> <code>PUT</code>
>
> JSON Format : 
>
> ```javascript
> {
>       "country":  "Albania",
>       "data": 
>           {
>               "2000": 7219,
>               "2010": 7219,// optioneel
>               "2015": 7219,// optioneel
>               "2018": 7219 // optioneel
>               
>           }
>   }
> ```

Add a country

> Endpoint: http://localhost:3000/GNIPerCapita/addCountry
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> [{
>   "Country": "Albania"
> }]
> ```

Delete a country

> Endpoint: http://localhost:3000/GNIPerCapita/deleteCountry/:id
>
> <code>DELETE</code>
>
> JSON Format : 
>
> ```javascript
> // no json is being send but instead given as PARAMETER
> // @parameter : :id
> --------------------------------------------------------
> // Examples : 
> //	http://localhost:3000/GNImale/deleteCountry/Albania
> //	http://localhost:3000/GNImale/deleteCountry/Armenia
> //	http://localhost:3000/GNImale/deleteCountry/Cyprus
> 
> 
> 	
> ```

# XML request layout 

Vanwege omstandigheden is tot op het heden de functionaliteit om XML als request te sturen nog niet geimplementeerd, dit zal in de toekomst worden toegevoegd.

  ```	<object>
    <?xml version="1.0" encoding="UTF-8" ?>
    <country>
            Albania
    </country>
    <data>
      <_1995>345</_1995>
      <_2000>34636</_2000>
      <_2005>3453</_2005>
      <_2010>345</_2010>
      <_2011>345</_2011>
      <_2012>546</_2012>
      <_2013>2143</_2013>
      <_2014>876</_2014>
      <_2015>678</_2015>
      <_2016>678</_2016>
      <_2017>8769</_2017>
      <_2018>678</_2018>
    </data>
  </object>
  ```