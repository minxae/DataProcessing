const express = require("express"); //Express
const res = require("express/lib/response");
const app = express();
const mysql = require("mysql"); //Mysql
const Ajv = require("ajv"); //AVJ JSON schema validator
const { query } = require("express");
const { resolveSchema } = require("ajv/dist/compile");
const crud = require("./CRUD");
const Connection = require("mysql/lib/Connection");
var xmlparser = require('express-xml-bodyparser');


app.use(xmlparser());
app.use(express.json());

const ajv = new Ajv();


const tableMale = "estimated_gni_male";
const tableFemale = "estimated_gni_female";
const tablePerCapita = "estimated_per_capita";

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
