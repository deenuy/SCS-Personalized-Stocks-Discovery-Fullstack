module.exports = function(sequelize, DataTypes) {
    var FavoriteStock = sequelize.define("FavoriteStock", {
        stockName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        stockSymbol: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['stockName']
            }
        ]
    });
    /*
    Country.associate = function(models) {
        Country.hasMany(models.Place, {
            onDelete: "cascade"
        });
    };
    */
    return FavoriteStock;
};