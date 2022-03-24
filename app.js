const express = require("express"); //Express
const app = express();

const GNImale = require("./routes/GNIMaleRoute.js");
const GNIFemale = require("./routes/GNIFemaleRoute.js");
const GNIPerCapita = require("./routes/GNIPerCapita.js");

//routes
app.use("/GNImale", GNImale);
app.use("/GNIFemale", GNIFemale);
app.use("/GNIPerCapita", GNIPerCapita);


app.listen(3000);
