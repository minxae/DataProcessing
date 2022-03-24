const express = require("express"); //Express
const app = express();
const Ajv = require("ajv"); //AVJ JSON schema validator
const crud = require("./CRUD");
const xmlparser = require("express-xml-bodyparser");
const xml2js = require("xml2js");

app.use(xmlparser());
app.use(express.json());

const ajv = new Ajv();// JSON schema validator

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
app.get("/GNImale/allData", async (req, res)=>
{
    try
    {
        const data = await crud.getAllData(tableMale);
        res.status(200);
        res.send(data);
    }catch(err)
    {
        res.status(400);
        res.send(err);
    }
    
});

// -Gets a single record
app.post("/GNImale/singleRecord", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema_single_record, req.body);
     
    if(valid)
    {
        try
        {
            const data = await crud.getOneSingleRecord(req, tableMale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(400);
            res.send(err);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
    
});

// -Updating data from client
// -Male GNI table
app.put("/GNImale/updateCountry", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema, req.body);

    if(valid)
    {
        try{
            const data = await crud.updateData(req, tableMale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(400);
            res.send(data);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
});
// -Create new row with data
app.post("/GNImale/addCountry", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema, req.body);

    if(valid)
    {
        try
        {
            const data = await crud.addCountry(req, tableMale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(400);
            res.send(data);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
});

app.delete("/GNImale/deleteCountry/:country", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema, req.body);
    if(valid)
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
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
});

// ------------------------------Female GNI routes--------------------------------------

app.get("/GNIFemale/allData", async (req, res)=>
{
    try
    {
        const data = await crud.getAllData(tableFemale);
        res.status(200);
        res.send(data);
    }catch(err)
    {
        res.status(400);
        res.send(err);
    }
    
});

// -Gets a single record
app.post("/GNIFemale/singleRecord", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema_single_record, req.body);
     
    if(valid)
    {
        try
        {
            const data = await crud.getOneSingleRecord(req, tableFemale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(400);
            res.send(err);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
    
});

// -Updating data from client
// -Male GNI table
app.put("/GNIFemale/updateCountry", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema, req.body);

    if(valid)
    {
        try{
            const data = await crud.updateData(req, tableFemale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(400);
            res.send(data);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
});
// -Create new row with data
app.post("/GNIFemale/addCountry", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema, req.body);

    if(valid)
    {
        try
        {
            const data = await crud.addCountry(req, tableFemale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(400);
            res.send(data);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
});

app.delete("/GNIFemale/deleteCountry/:country", async (req, res) =>
{
    const valid = ajv.validate(GNI_MaleFemale_schema, req.body);
    if(valid)
    {
        try
        {
            const data = await crud.deleteCountry(req, tableFemale);
            res.status(200);
            res.send(data);
        }catch(err)
        {
            res.status(200);
            res.send(err);
        }
    }else
    {
        res.statusMessage = "JSON invalid";
        res.status(400);
        res.send("Data must be send in JSON schema format.")
    }
});

app.listen(3000);
