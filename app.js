const express = require("express"); //Express
const res = require("express/lib/response");
const app = express();
const mysql = require("mysql"); //Mysql
const Ajv = require("ajv"); //AVJ JSON schema validator

app.use(express.json());
// -AJV schema lib
const schema = require("./JSON_Schemas/JSON_schema_GNI_Male.json");

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

// -Selecting all data from table.
app.post("/insertData", (req, res)=>
{
    const validJson = ajv.validate(schema, req.body);
    if(validJson)
    {
        res.status(200)
        res.send("DATA BEEN INSERTED");
    }
    else 
    {
        res.status(400)
        res.send("DATA NOT BEEN INSERTED");
    }
    console.log("asdasdad")
    
});
// -returns object with JSON
app.get('/select', (req,res) =>
{
    var query = "SELECT estimated_gni_male.2000, estimated_gni_female.2000 FROM estimated_gni_male JOIN estimated_gni_female ON estimated_gni_male.Country = estimated_gni_female.Country WHERE estimated_gni_male.Country = 'Albania'";
    conn.connect(function(err)
    {
        if(err) throw err;
        conn.query(query, function (err, result, fields)
        {
            if(err)throw err;
            res.send(result)
        });
    })
});



app.listen(3000);
