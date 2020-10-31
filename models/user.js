module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(70),
            allowNull: false
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['firstName', 'lastName']
            },
            {
                unique: true,
                fields: ['username']
            },
            {
                unique: true,
                fields: ['email']
            }
        ]
    });
    
    User.associate = function(models) {
        User.hasMany(models.FavoriteStock, {
            onDelete: "cascade"
        });
    };
    
    return User;
};