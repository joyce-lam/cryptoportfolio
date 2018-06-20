module.exports = function(sequelize, DataTypes) {
    var UserCryptocurrency = sequelize.define("UserCryptocurrency", {
        share: {
            type: DataTypes.FLOAT
        }
    });
    UserCryptocurrency.associate = function(models) {
        UserCryptocurrency.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        UserCryptocurrency.belongsTo(models.Cryptocurrency);
    };
    return UserCryptocurrency;
};