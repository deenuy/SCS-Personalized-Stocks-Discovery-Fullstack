module.exports = function(sequelize, DataTypes) {
    var FavoriteNews = sequelize.define("FavoriteNews", {
        title: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        //summary: {
        //    type: DataTypes.STRING(250),
        //    allowNull: false
        //},
        publisher: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        sourceLink: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['title']
            }
        ]
    });
    
    FavoriteNews.associate = function(models) {
        FavoriteNews.belongsTo(models.FavoriteStock, {
            foreignKey: {allowNull: false}
        });
    };
    
    return FavoriteNews;
};