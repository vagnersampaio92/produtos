const axios = require('axios')
const redis = require('promise-redis')()
const client = redis.createClient()

class ListController {
    async listAll(req, res) {
        try {
            const getRedis = await client.get(req.params.page)
            if (!getRedis) {
                const response = await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${req.params.page}`)
                response.data.products.map(obj => {
                    delete obj.brand;
                    obj.url = `http://challenge-api.luizalabs.com/api/product/${obj.id}/`
                    delete obj.id;
                })
                const setredis = await client.set(req.params.page, JSON.stringify(response.data), 'EX', 300)
                res.json(response.data);
            } else {
                res.json(JSON.parse(getRedis));
            }

        } catch (error) {
            return res.status(404).json({ message: "Page not found." })
        }
    }
}

module.exports = new ListController()