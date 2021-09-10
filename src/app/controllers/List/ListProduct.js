const axios = require('axios')

class ListController {
    async listAll(req, res) {
        try {
            const response = await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${req.params.page}`)
            response.data.products.map(obj=>{
                delete obj.brand;
                obj.url = `http://challenge-api.luizalabs.com/api/product/${obj.id}/`
                delete obj.id;
                
            })
            res.json(response.data);
        } catch (error) {
            return res.status(404).json({ message:"Page not found." })
        }
    }
}

module.exports = new ListController()