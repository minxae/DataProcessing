const express = require("express"); //Express
const res = require("express/lib/response");
const app = express();
const mysql = require("mysql"); //Mysql
const Ajv = require("ajv"); //AVJ JSON schema validator
const { query } = require("express");

app.use(express.json());
// -AJV schema lib for female and male 
const GNI_MaleFemale_schema = require("./JSON_Schemas/JSON_schema_GNI_Male.json");
const GNI_MaleFemale_schema_single_record = require("./JSON_Schemas/JSON_schema_GNI_Male_single_record.json");
const { resolveSchema } = require("ajv/dist/compile");

const ajv = new Ajv();

// -in this format data will be send to the api and checked by the validator
const data = [{
    "Country": "Albania",
    "2000": 23423
}]


// -Database connection 
const conn = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'income_per_country'  
    });

// -Credentials DB mysql workbench
const host = "127.0.0.1";
const port = "3306";
const dbUsername = "root";

app.get('/testRoute', (req, res) =>
{
    res.send("TESTING ROUTE");

});
conn.connect(function(err)
{
    if(err) throw err;
});

// -Selecting all data from table.
// - This endpoint gets all the record that are the table:
// # estimated_gni_male

app.get("/estimatedGNIMale", (req, res)=>
{
    const query = "SELECT * FROM estimated_gni_male"
    
    conn.query(query, function(err, result, fields)
    {
        if(result.length > 0)
        {
            if(err) throw err;

            const valid = ajv.validate(GNI_MaleFemale_schema, result); 
    
            // -checks if JSON data is valid with the schema
            if(valid)
            {
                res.status(200);
                res.send(result);
            }else
            {
                res.status(400);
                res.send("Data form API is invalid");
            }
        }else 
        {
            res.status(400)
            res.send("No data found").end();
            console.log("No data found in ")
        }
        
    })
    
});

// Gets a single record
app.post("/GNIMaleSingleRecord", (req, res) =>
{
    const json = req.body;
    const year = req.body[0].Year;
    const country = req.body[0].Country;
    const valid = ajv.validate(GNI_MaleFemale_schema_single_record, json);
    const values = [year, country];

    const query = "SELECT `?` FROM estimated_gni_male WHERE Country = ?";
    if(valid)
    {   
        conn.query(query, values, function(err, result, fields)
        {
            if(err)throw err;
            if(result.length > 0)
            {
                console.log(result);
                res.status(200);
                res.send(result);
            }else
            {
                res.status(204) // -204 No Content
                res.send("No results found with given year.");
            }
            
        })  
    }else
    {
        res.status(400);
        res.send("JSON not valid")
    }

});
// -Updating data from client
app.put("/estimatedGNIMale/update", (req, res) =>
{
    const data = req.body;
    const reference = req.body[0].Country;

    const valid = ajv.validate(GNI_MaleFemale_schema, data)
    
    if(valid)
    {
        console.log(data);
        res.status(200)
        res.send("Updated data");
    }else
    {
        res.status(400)
        res.send("JSON invalid");
    }
    
});

// -Selecting all data from table.
// - This endpoint gets all the record that are the table:
// # estimated_gni_female

app.get("/estimatedGNIFemale", (req, res)=>
{
    const query = "SELECT * FROM estimated_gni_Female"
    
    conn.query(query, function(err, result, fields)
    {
        if(err) throw err;

        const valid = ajv.validate(schema, result); 

        // -checks if JSON data is valid with the schema
        if(valid)
        {
            res.status(200);
            res.send(result);
        }else
        {
            res.status(400);
            res.send("Data form API is invalid");
        }
    });
});
// -returns object with JSON
app.get('/select', (req,res) =>
{
    var query = "";

});


app.listen(3000);
