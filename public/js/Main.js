let apiCaller = new ApiHelper();

async function useDataGNIMale(country)
{
    let call = await apiCaller.getDataFromMaleGNI(country);
    createChart("GNImale", call[0], "line");
}
async function useDataGNIFemale(country)
{
    let call = await apiCaller.getDataFromFemaleGNI(country);
    createChart("GNIfemale", call[0], "line");
}
async function useDataGNIPerCapita(country)
{
    let call = await apiCaller.getDataFromGNIPerCapita(country);
    createChart("GNIperCapita", call[0], "line");
}
//This function cleans and sort the array so the createChart funtion can take over its data.
function createChart(id, json, chartType)
{
    let xaxis = [];
    let values = [];
    let country = json.Country +" - " + json.Info;
    for(x in json)
    {
        if(x == "Country")
        { 
            chart(id,values, xaxis, country, chartType);
            return "chart created"

        }else
        {
            xaxis.push(x);
            values.push(json[x]);
        }
        console.log(x);
    }
}

function chart(id, values, xaxis, title, chartType)
{
    const labels = xaxis;
    
      const data = {
        labels: labels,
        datasets: [{
          label: title,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: values,
        }]
      };
    
      const config = {
        type: chartType,
        data: data,
        options: {}
      };
    
      console.log(id);
      const chart = new Chart(
        document.getElementById(id),
        config
    );
}

useDataGNIFemale("Albania");
useDataGNIMale("Canada");
useDataGNIPerCapita("Afghanistan");

  
