const express = require("express"); //Express
const app = express();
const path = require("path");

const GNImale = require("./routes/GNIMaleRoute.js");
const GNIFemale = require("./routes/GNIFemaleRoute.js");
const GNIPerCapita = require("./routes/GNIPerCapita.js");

//file serving routes
const home = require("./public_routes/home.js");

//routes
app.use("/GNImale", GNImale);
app.use("/GNIFemale", GNIFemale);
app.use("/GNIPerCapita", GNIPerCapita);


//public routes html/js/css
app.use('/static', express.static('public'));// -serving static files to the browser

app.get("/home", (req, res) =>
{   
    const filePath = path.join(__dirname, "./public/html/index.html")
    res.sendFile(filePath);
});

app.listen(3000);
