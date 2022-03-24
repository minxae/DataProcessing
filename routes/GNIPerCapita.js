const express = require("express");
const crud = require("../CRUD");
const xmlparser = require("express-xml-bodyparser");
const Ajv = require("ajv"); //AVJ JSON schema validator
const ajv = new Ajv();// JSON schema validator

let router = express.Router();

router.use(xmlparser());
router.use(express.json());


// -tables
const tableMale = "gni_per_capita";

// -JSON schemas 
const GNI_Per_capita_schema = require("../JSON_Schemas/JSON_schema_GNI_per_capita.json");
const GNI_MaleFemale_schema_single_record = require("../JSON_Schemas/JSON_schema_GNI_Male_single_record.json");

// - Selecting all data from table.
// - This endpoint gets all the records that are in the table:
// # estimated_gni_male
router.get("/allData", async (req, res)=>
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
router.post("/singleRecord", async (req, res) =>
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
// -GNI per capita table
router.put("/updateCountry", async (req, res) =>
{
    const valid = ajv.validate(GNI_Per_capita_schema, req.body);

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
router.post("/addCountry", async (req, res) =>
{
    const valid = ajv.validate(GNI_Per_capita_schema, req.body);

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

router.delete("/deleteCountry/:country", async (req, res) =>
{
    const valid = ajv.validate(GNI_Per_capita_schema, req.body);
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

module.exports = router;