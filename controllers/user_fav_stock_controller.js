var http = require("https");
var db = require("../models");
module.exports = function (app) {
    app.post("/api/add_fav_stock", function (req, res) {
        db.User.findOne({ username: req.body.username }).then(function (dbUser) {
            var userID = dbUser.id;
            console.log(userID);
            var obj = req.body;
            obj.UserId = userID;
            db.FavoriteStock.create(obj).then(function (dbPost) {
                res.json(dbPost);
            });
        });
    });
    app.post("/api/add_user", function (req, res) {
        console.log(JSON.stringify(req.body));
        db.User.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    app.delete("/api/delete_user", function (req, res) {
        db.User.destroy({
            where:req.body}).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    app.delete("/api/delete_fav_stock", function (req, res) {
        db.User.findOne({ username: req.body.username }).then(function (dbUser) {
            var userID = dbUser.id;
            console.log(userID);
            var obj = {stockSymbol:req.body.stockSymbol,UserID:userID};
            obj.UserId = userID;
            db.FavoriteStock.destroy({where:obj}).then(function (dbPost) {
                res.json(dbPost);
            });
        });
    });
}
//{"firstName":"Sam","lastName":"Smith","username":"Smith77","email":"smith77@gmail.com"}
//{"stockName":"Apple","stockSymbol":"APPL","username":"Smith123"}