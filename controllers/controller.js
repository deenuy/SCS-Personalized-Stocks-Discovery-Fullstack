var http = require("https");
var db = require("../models");
module.exports = function (app) {
    //For adding Favorite Stocks
    ///Need to send an object such as {"stockName":"Apple","stockSymbol":"APPL","username":"Smith123"}
    //Username will be used to search for userid 
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
    //For adding User
    //Need to send an object such as {"firstName":"Sam","lastName":"Smith","username":"Smith77","email":"smith77@gmail.com"}
    app.post("/api/add_user", function (req, res) {
        console.log(JSON.stringify(req.body));
        db.User.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    //For deleting User
    //Need to send an object such as {"username":"Smith123"}
    app.delete("/api/delete_user", function (req, res) {
        db.User.destroy({
            where: req.body
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });
    //For deleting favorite stock 
    //Need to send an object such as {"stockSymbol":"APPL","username":"Smith123"}
    app.delete("/api/delete_fav_stock", function (req, res) {
        db.User.findOne({ username: req.body.username }).then(function (dbUser) {
            var userID = dbUser.id;
            console.log(userID);
            var obj = { stockSymbol: req.body.stockSymbol, UserID: userID };
            obj.UserId = userID;
            db.FavoriteStock.destroy({ where: obj }).then(function (dbPost) {
                res.json(dbPost);
            });
        });
    });
    //For adding Favorite Stocknews 
    //Need to send an object such as {"stockSymbol":"APPL","username":"Smith123","title":"How to watch Apple's Sept. 15 event and what to expect", "publisher":"Yahoo Finance", "sourceLink":"https://ca.finance.yahoo.com/news/apple-sept-15-event-how-to-watch-141123850.html"}
    app.post("/api/add_fav_news", function (req, res) {
        db.User.findOne({ where: { username: req.body.username } }).then(function (dbUser) {
            var userID = dbUser.id;
            db.FavoriteStock.findOne({ where: { UserId: userID, stockSymbol: req.body.stockSymbol } })
                .then(function (dbFavoriteStock) {
                    var favoriteStockId = dbFavoriteStock.id;
                    console.log(JSON.stringify(dbFavoriteStock));
                    var obj = req.body;
                    obj.FavoriteStockId = favoriteStockId;
                    db.FavoriteNews.create(obj).then(function (dbPost) {
                        res.json(dbPost);
                    });
                });

        });
    });

    //For deleting Favorite Stocknews
    //Need to send an object such as {"username":"Smith123","stockSymbol":"APPL","title":"How to watch Apple's Sept. 15 event and what to expect"}
    app.delete("/api/delete_fav_news", function (req, res) {
        console.log(JSON.stringify(req.body));
        db.User.findOne({ where: { username: req.body.username } }).then(function (dbUser) {
            var userID = dbUser.id;
            console.log(userID);
            db.FavoriteStock.findOne({
                where: {
                    UserId: userID,
                    stockSymbol: req.body.stockSymbol
                }
            }).then(function (dbInfo) {
                console.log(JSON.stringify(dbInfo));
                var favoriteStockId = dbInfo.id;
                db.FavoriteNews.destroy({ where:{ FavoriteStockId:favoriteStockId,title: req.body.title}}).then(function (dbPost) {
                    res.json(dbPost);
                });
                /*var userID = dbUser.id;
                db.FavoriteStock.findOne({ where: { UserId: userID, stockSymbol: req.body.stockSymbol } })
                    .then(function (dbFavoriteStock) {
                        var favoriteStockId = dbFavoriteStock.id;
                        console.log(JSON.stringify(dbFavoriteStock));
                        var obj = req.body;
                        obj.FavoriteStockId = favoriteStockId;
                        db.FavoriteNews.create(obj).then(function (dbPost) {
                            res.json(dbPost);
                        });
                    });
                */
            });
        });
    });
}
