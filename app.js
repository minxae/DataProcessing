const express = require("express");
const res = require("express/lib/response");
const app = express();

// -Sql package
const mysql = require("mysql");
// -Connection 
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

// -Deleting data
app.post('/delete:', (req, res) =>
{

});
// -Manipulating data
app.post('/update:', (req, res) =>
{

});
app.post('/insert:', (req, res) =>
{

});

app.listen(3000);
