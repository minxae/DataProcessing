const express = require("express"); //Express
const app = express();
const Ajv = require("ajv"); //AVJ JSON schema validator
const crud = require("./CRUD");
var xmlparser = require('express-xml-bodyparser');


app.use(xmlparser());
app.use(express.json());

const ajv = new Ajv();


const tableMale = "estimated_gni_male";
const tableFemale = "estimated_gni_female";
const tablePerCapita = "estimated_per_capita";

// -JSON schemas 
const GNI_MaleFemale_schema = require("./JSON_Schemas/JSON_schema_GNI_Male.json");
const GNI_MaleFemale_schema_single_record = require("./JSON_Schemas/JSON_schema_GNI_Male_single_record.json");
const GNI_Per_capita_schema = require("./JSON_Schemas/JSON_schema_GNI_per_capita.json");

// - Selecting all data from table.
// - This endpoint gets all the records that are in the table:
// # estimated_gni_male
app.post("/GNImale/allData", async (req, res)=>
{
    const valid = validator(req.body);
    if(valid)
    {

    }
    // try
    // {
    //     const data = await crud.getAllData(tableMale);
    //     res.status(200);
    //     res.send(data);
    // }catch(err)
    // {
    //     res.status(400);
    //     res.send(err);
    // }
    
});

function validator(body)
{
    const JSONValidator = ajv.validate(GNI_MaleFemale_schema, body)
    const XMLValidator = false;
    if(JSONValidator || XMLValidator)
    {
        return true;
    }else
    {
        return false;
    }
}

// -Gets a single record
app.post("/GNImale/singleRecord", async (req, res) =>
{
    try
    {
        const data = await crud.getOneSingleRecord(tableMale);
        res.status(200);
        res.send(data);
    }catch(err)
    {
        res.status(400);
        res.send(err);
    }
});

// -Updating data from client
// -Male GNI table
app.put("/GNImale/updateCountry", async (req, res) =>
{
    try
    {
        const data = await crud.updateData(req, tableMale);
        res.status(200);
        res.send(data);
    }catch(err)
    {
        res.status(400);
        res.send(data);
    }
    
});
// -Create new row with data
app.post("/GNImale/addCountry", async (req, res) =>
{
    console.log(req.body.country)
    // try
    // {
    //     const data = await crud.addCountry(req, tableMale);
    //     res.status(200);
    //     res.send(data);
    // }catch(err)
    // {
    //     res.status(400);
    //     res.send(data);
    // }

});

app.delete("/GNImale/deleteCountry/:country", async (req, res) =>
{
    try
    {
        const data = await crud.deleteCountry(req, tableMale);
        res.status(200);
        res.send(data);
    }catch(err)
    {
        res.status(200);
        res.send(err);
    }
});

app.listen(3000);
