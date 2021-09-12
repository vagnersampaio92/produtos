const { Favorite, User } = require('./../../models')
const axios = require('axios')

class FavoriteController {

    async store(req, res) {
        const { product_id } = req.body
        let obj = {}
        try {
            const user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: req.userId
                }
            })
            if (!user) {
                return res.status(404).json({ message: 'User not found.' })
            }
            const response = await axios.get(`http://challenge-api.luizalabs.com/api/product/${product_id}/`)
            const thereIsThis = await Favorite.findOne({
                attributes: ['id'],
                where: {
                    user_id: req.userId,
                    product_id: product_id
                }
            })
            if (thereIsThis != null) {
                return res.status(401).json({ message: "Product already exists in the list." })
            }
            obj.user_id = req.userId
            obj.product_id = product_id
            obj.price = response.data.price
            obj.image = response.data.image
            obj.title = response.data.title
            obj.review_score = response.data.reviewScore ? response.data.reviewScore : null
            obj.url = `http://challenge-api.luizalabs.com/api/product/${product_id}/`
            const favorite = await Favorite.create(obj)
            return res.json(favorite);


        } catch (error) {
            return res.status(401).json({ message: "Invalid data." })
        }

    }
    async listAlll(req, res) {
        try {
            const favorite = await Favorite.findAll({
                where: {
                    user_id: req.userId
                }
            })
            res.json(favorite);

        } catch (error) {
            return res.status(401).json({ message: error })
        }
    }
    async delete(req, res) {
        try {
            const favorite = await Favorite.destroy(
                {
                    where: {
                        product_id: req.params.product_id,
                        user_id: req.userId
                    }
                }
            )
            if (favorite == 0) {
                return res.status(404).json({ message: 'Product or user not found.' })
            } else {
                return res.json({ message: `Success, ${favorite} product or user users.` });
            }

        } catch (error) {
            return res.status(401).json({ message: error })
        }
    }


}
module.exports = new FavoriteController()