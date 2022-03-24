class ApiHelper
{
    
    constructer()
    {
        const error = {"Message": "No data found"};
    }

    async getDataFromMaleGNI(country)
    {
        const url = "http://localhost:3000/GNImale/singleRecord"
        const JsonObject = 
        [{
            "Country" : country
        }]
        const options = 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(JsonObject)
        }
        const response  = await fetch(url, options)
        const data  = await response.json();
        if(data.length > 0)
        {
            return data;
        }else 
        {
            return {"Message": "No data found"};
        }
        return data;
        
  

    }
    async getDataFromFemaleGNI(country)
    {
        const url = "http://localhost:3000/GNIFemale/singleRecord"
        const JsonObject = 
        [{
            "Country" : country
        }]
        const options = 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(JsonObject)
        }
        const response  = await fetch(url, options)
        const data  = await response.json();
        console.log(data);

        return data;

    }
    async getDataFromGNIPerCapita(country)
    {
        const url = "http://localhost:3000/GNIPerCapita/singleRecord"
        const JsonObject = 
        [{
            "Country" : country
        }]
        const options = 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(JsonObject)
        }
        const response  = await fetch(url, options)
        const data  = await response.json();
        console.log(data);

        return data;

    }

    
}