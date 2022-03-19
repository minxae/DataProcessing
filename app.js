const express = require("express");
const app = express()


app.get('/testRoute', (req, res) =>
{
    res.send("TESTING ROUTE");

});

app.listen(3000);
