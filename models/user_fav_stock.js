module.exports = function(sequelize, DataTypes) {
    var FavoriteStock = sequelize.define("FavoriteStock", {
        stockName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        stockSymbol: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['stockName']
            }
        ]
    });
    
    FavoriteStock.associate = function(models) {
        FavoriteStock.belongsTo(models.stockSymbol, {
            foreignKey: {allowNull: false}
        });
    };
    
    return FavoriteStock;
};