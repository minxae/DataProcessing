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

## home page

Om vervolgens naar de home pagina te gaan voeren we de volgende URL in:

> <code>http://localhost:3000/home</code>

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

> Endpoint: http://localhost:3000/GNImale/
>
> <code>GET</code>

Get data from one country

> Endpoint: http://localhost:3000/GNImale/:country
>
> <code>GET</code>

Update data from one country

> Endpoint: http://localhost:3000/GNImale/
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
>               "Info": "Female/male" // optioneel 
>           }
>   }
> ```

Add a country

> Endpoint: http://localhost:3000/GNImale/
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> {
>   "country": "Albania"
> }
> ```

Delete a country

> Endpoint: http://localhost:3000/GNImale/:country
>
> <code>DELETE</code>
>
> JSON Format : 
>
> ```javascript
> // no json is being send but instead given as PARAMETER
> // @parameter : :country
> --------------------------------------------------------
> // Examples : 
> //	http://localhost:3000/GNImale/Albania
> //	http://localhost:3000/GNImale/Armenia
> //	http://localhost:3000/GNImale/Cyprus
> 	
> ```

## GNI Female routes

Get all data

> Endpoint: http://localhost:3000/GNIFemale/
>
> <code>GET</code>

Get data from one country

> Endpoint: http://localhost:3000/GNIFemale/:country
>
> <code>GET</code>

Update data from one country

> Endpoint: http://localhost:3000/GNIFemale/
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
>               "Info": "Female/male" // optioneel 
>           }
>   }
> ```

Add a country

> Endpoint: http://localhost:3000/GNIFemale/
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> {
>   "country": "Albania"
> }
> ```

Delete a country

> Endpoint: http://localhost:3000/GNIFemale/:country
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
> //	http://localhost:3000/GNImale/Albania
> //	http://localhost:3000/GNImale/Armenia
> //	http://localhost:3000/GNImale/Cyprus
> 	
> ```

## GNI per Capita routes

Get all data

> Endpoint: http://localhost:3000/GNIPerCapita/
>
> <code>GET</code>

Get data from one country

> Endpoint: http://localhost:3000/GNIPerCapita/:country
>
> <code>GET</code>

Update data from one country

> Endpoint: http://localhost:3000/GNIPerCapita/
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
>               "Info": "Female/male" // optioneel 
>           }
>   }
> ```

Add a country

> Endpoint: http://localhost:3000/GNIPerCapita/
>
> <code>POST</code>
>
> JSON Format : 
>
> ```javascript
> {
>   "Country": "Albania"
> }
> ```

Delete a country

> Endpoint: http://localhost:3000/GNIPerCapita/:country
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
> //	http://localhost:3000/GNImale/Albania
> //	http://localhost:3000/GNImale/Armenia
> //	http://localhost:3000/GNImale/Cyprus
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