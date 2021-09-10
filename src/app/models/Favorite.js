//const { User } = require('./')

module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        user_id: DataTypes.INTEGER,
        product_id:DataTypes.STRING,
        price: DataTypes.FLOAT,
        image: DataTypes.STRING,
        title: DataTypes.STRING,
        review_score: DataTypes.FLOAT,
        url: DataTypes.STRING,

    }, {})

    Favorite.associate = models => {
        Favorite.belongsTo(models.User, { foreignKey: 'user_id' })

    }


    return Favorite
}