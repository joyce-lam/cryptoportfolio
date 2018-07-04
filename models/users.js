module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        } 
    });

    User.associate = function(models) {
        User.hasMany(models.UserCryptocurrency);
    };
    return User;
};