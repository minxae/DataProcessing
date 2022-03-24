const express = require("express");
const path = require("path");
let router = express.Router();

// router.use(express.static('public'));
// router.use('/static', express.static('public'))

// router.get("/home", (req, res) =>
// {
//     const filePath = path.join(__dirname, "../public/html/index.html")
//     res.sendFile(filePath);
// });

module.exports = router;