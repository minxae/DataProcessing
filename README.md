# DataProcessing
Eind opdracht Data-processing

## Installeren

Install express
> <code>npm install express</code>

Install ajv validator
> npm install ajv

Na het installeren kunnen we in de terminal het volgende typen:
> node app.js

Als alles goed verloopt zien we geen errors en staat de API op scherp.

# Updating records format:
{
    "country":  "Albania",
    "data": 
        {
            "2000": 7219
            
        }
}

# Selecting one single record format:
{
    "Country": "Albania",
    "Year": 2000
}
# Deleting Country
Bij het verwijderen van een land zal er een parameter mee gegeven worden met de route.

# XML request layout
<code>
  <?xml version="1.0" encoding="UTF-8" ?>
  <object>
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
</code>
