# DataProcessing
### Eind opdracht Data-processing

In dit bestand wordt de volledige API uitgelegd en hoe u hem moet installeren op uw huidige apparaat.

## Installeren 

Install all dependencies
> <code>npm i</code>

Na het installeren kunnen we in de terminal het volgende typen:
> <code>nodemon app.js</code>

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

<strong>!Het blok code bevindt zich in de file CRUD.js boven aan pas dit aan naar uw eigen gegevens!</strong>

# Endpoints and formats :

Hier onder bevinden zich alle routes/endpoints die de API bevat.

## GNI male routes

De volgende commands moeten worden ingevoerd in de terminal van visual studio code:

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
>   "country": "Albania"
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

# MUST READ!

Vanwege omstandigheden is tot op het heden de functionaliteit om XML als request te sturen nog niet geimplementeerd. De library die ik zou moeten gebruiken geeft verschillende errors bij het proberen te installeren als package, dus kan ik hem niet gebruiken. Ook op een ander apparaat werkt de library niet en kan ik dit gedeelte niet implementeren. Als u enige tips heeft om dit te voorkomen zou ik dat waarderen want ik heb alles geprobeerd. Ik heb wel het XSD schema gemaakt en de API XML requests laten afhandelen alleen niet doormiddel van een XSD schema validatie.

  ```	<object>
<?xml version="1.0" encoding="utf-8"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="object">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="country" type="xs:string" />
        <xs:element name="data">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="_1995" type="xs:int" />
              <xs:element name="_2000" type="xs:int" />
              <xs:element name="_2005" type="xs:int" />
              <xs:element name="_2010" type="xs:int" />
              <xs:element name="_2011" type="xs:int" />
              <xs:element name="_2012" type="xs:int" />
              <xs:element name="_2013" type="xs:int" />
              <xs:element name="_2014" type="xs:int" />
              <xs:element name="_2015" type="xs:int" />
              <xs:element name="_2016" type="xs:int" />
              <xs:element name="_2017" type="xs:int" />
              <xs:element name="_2018" type="xs:int" />
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
  ```