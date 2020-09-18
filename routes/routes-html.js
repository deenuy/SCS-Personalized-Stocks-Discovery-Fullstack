var http = require("https");
var db = require("../models");
module.exports = function (app) {
    app.get("/my-dashboard", function (req, res) {
        res.sendFile("my-dashboard.html");
    });
    app.get("/", function (req, res) {
        res.sendFile("index.html");
    });
}