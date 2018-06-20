module.exports = function(sequelize, DataTypes) {
    var Cryptocurrency = sequelize.define("Cryptocurrency", {
        name: {
            type: DataTypes.STRING
        }, 
        symbol: {
            type: DataTypes.STRING
        },
        imageUrl: {
            type: DataTypes.STRING
        }
    });
    Cryptocurrency.associate = function(models) {
        Cryptocurrency.hasMany(models.UserCryptocurrency);
    }
    return Cryptocurrency;
};