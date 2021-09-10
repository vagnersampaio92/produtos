//const { User } = require('./')

module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define('favorites', {
        user_id: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        image: DataTypes.STRING,
        title: DataTypes.STRING,
        reviewScore: DataTypes.FLOAT,
        url: DataTypes.STRING,

    }, {})

    favorite.associate = models => {
        favorite.belongsTo(models.User, { foreignKey: 'user_id' })

    }


    return favorite
}