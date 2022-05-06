class ApiHelper
{
    constructer()
    {

    }
     // - Gets the GNI_female data from one country
    async getDataFromMaleGNI(country)
    {
        const url = "http://localhost:3000/GNImale/" + country;
        const options = 
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response  = await fetch(url, options)
        const data  = await response.json();

        return data;
    }

    // - Gets the GNI_female data from one country
    async getDataFromFemaleGNI(country)
    {
        const url = "http://localhost:3000/GNIFemale/" + country;
        const options = 
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response  = await fetch(url, options)
        const data  = await response.json();

        return data;
    }

    // -Gets all GNI data from one country
    async getDataFromGNIPerCapita(country)
    {
        const url = "http://localhost:3000/GNIPerCapita/" + country;
        const options = 
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response  = await fetch(url, options)
        const data  = await response.json();

        return data;
    }
    // -Gets all the countries
    async getAllCountries()
    {
        const url = "http://localhost:3000/GNIFemale/"
        const options = 
        {
            method: 'GET',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response  = await fetch(url, options)
        const data  = await response.json();

        return data;
    }

}