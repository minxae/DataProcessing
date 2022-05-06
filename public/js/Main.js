let apiCaller = new ApiHelper();
charts = [];
async function useDataGNIMale(country, update)
{
    let call = await apiCaller.getDataFromMaleGNI(country);
    createChart("GNImale", call[0], "line", update, 1);
}
async function useDataGNIFemale(country, update)
{
    let call = await apiCaller.getDataFromFemaleGNI(country);
    createChart("GNIfemale", call[0], "line", update, 0);
}
async function useDataGNIPerCapita(country)
{
    let call = await apiCaller.getDataFromGNIPerCapita(country);
    createChart("GNIperCapita", call[0], "bar");
}

//This function cleans and sort the array so the createChart funtion can take over its data.
function createChart(id, json, chartType, update, position)
{
    let xaxis = [];
    let values = [];
    let country = json.Country +" - " + json.Info;

    if(update) //checking if the current chart need an update or not.
    {
        for(x in json)
        {
            if(x == "Country")
            { 
                updateChart(position, values, country);
                return "chart created"

            }else
            {
                xaxis.push(x);
                values.push(json[x]);
            }
        }
    }else
    {
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
        }
    }
}

// -Creates a NEW Chart object and pushes it to the given array 
function chart(id, values, xaxis, title, chartType)
{
    const data = 
        {
            labels: xaxis,
            datasets: 
            [
                {
                    label: title,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: values,
                },
            ]
        };
    const config = 
                {
                    type: chartType,
                    data: data,
                    options: {}
                };
    
    const chart = new Chart(document.getElementById(id) , config);
    charts.push(chart);  
}

// -Updating chart with new data form a country
function updateChart(position, values, country)
{
    let chart = charts[position];
    console.log(chart);
    chart.data.datasets[0].label = country;
    chart.data.datasets[0].data = [];
    for(x in values)
    {
        
        chart.data.datasets[0].data.push(values[x]);
    }

    console.log(chart.data.datasets[0].data)

     chart.update();
}

// -Event handlers 
$("#buttonFemale").click(function()
{
    let input = $(".femaleInput").val();

    useDataGNIFemale(input, true);
});

$("#buttonMale").click(function()
{
    let input = $(".maleInput").val();

    useDataGNIMale(input, true);
});

// -Generate first charts
useDataGNIFemale("Canada");
useDataGNIMale("Canada");
useDataGNIPerCapita("Cyprus");



  
