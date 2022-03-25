class ApiHelper
{
    constructer()
    {

    }
     // - Gets the GNI_female data from one country
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

    }

    // - Gets the GNI_female data from one country
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

    // -Gets all GNI data from one country
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