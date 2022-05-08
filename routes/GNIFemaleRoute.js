const express = require("express");
const crud = require("../CRUD");
const xmlparser = require("express-xml-bodyparser");
const Ajv = require("ajv"); //AVJ JSON schema validator
const ajv = new Ajv();// JSON schema validator

let router = express.Router();

router.use(xmlparser());
router.use(express.json());

// - tables
const tableFemale = "estimated_gni_female";

// - Gets all data from GNI Female dataset.
router.get("/", async (req, res)=>
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

// - Gets a single record
router.get("/:country", async (req, res) =>
{
    try
    {
        const data = await crud.getOneSingleRecord(req, tableFemale);
        console.log(data)
        if(data.length == 0)// Country doesnt exist!
        {
            res.status(404);
            res.send("Country you are trying to search doesn't exist.");
        }else
        {
            res.status(200);
            res.send(data)
        }
    }
    catch(err)
    {
        res.status(400);
        res.send(err);
    }
});

// - Updating data from client
// - Female GNI table
router.put("/", crud.validation, async (req, res) =>
{
    try
    {
        const data = await crud.updateData(req, tableFemale);
        res.status(data.Status);
        res.send(data.Message);
    }catch(err)
    {
        res.status(400);
        res.send(err);
    }

});
// - Create new country row with data
router.post("/", crud.validation, async (req, res) =>
{
    try
    {
        const data = await crud.addCountry(req, tableFemale);
        res.status(data.Status);
        res.send(data.Message);
    }catch(err)
    {
        res.status(400);
        res.send(err);
    }
});

// - Delete a country out of the database
// - Post the country you want to delete as a PARAMETER in the URL
router.delete("/:country", async (req, res) =>
{
    try
    {
        const data = await crud.deleteCountry(req, tableFemale);
        res.status(data.Status);
        res.send(data.Message);
    }catch(err)
    {
        res.status(400)
        res.send(err)
    }
});

module.exports = router;