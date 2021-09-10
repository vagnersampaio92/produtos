const { Favorite, User } = require('./../../models')
const axios = require('axios')

class FavoriteController {

    async store(req, res) {
        const { user_id, product_id } = req.body
        let obj = {}
        try {
            const user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: user_id
                }
            })
            if (!user) {
                return res.status(404).json({ message: 'User not found.' })
            }
            const response = await axios.get(`http://challenge-api.luizalabs.com/api/product/${product_id}/`)

            const thereIsThis = await Favorite.findOne({
                attributes: ['id'],
                where: {
                    user_id: user_id,
                    product_id:product_id
                }
            })
            if(thereIsThis != null){
                return res.status(401).json({ message:"Product already exists in the list." })
            }
            obj.user_id = user_id,
            obj.product_id = product_id
            obj.price = response.data.price
            obj.image = response.data.image
            obj.title = response.data.title
            obj.review_score = response.data.reviewScore ? response.data.reviewScore: null
            obj.url = `http://challenge-api.luizalabs.com/api/product/${product_id}/`
            const favorite = await Favorite.create(obj)
            return res.json(favorite);

            
        } catch (error) {
            return res.status(401).json({ message:"Invalid data." })
        }

    }
    async listAlll(req, res) {

    }
    async listById(req, res) {

    }
    async delete(req, res) {

    }


}
module.exports = new FavoriteController()