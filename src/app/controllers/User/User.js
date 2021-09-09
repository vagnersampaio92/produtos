const { User } = require('./../../models')

class UserController {

    async store(req, res) {
        try {

            if (validateEmail(req.body.email)) {
                const user = await User.create(req.body)
                return res.json(user);
            } else {
                return res.status(401).json({ message: "invalid email" })
            }


        } catch (error) {
            return res.status(401).json({ message: error.errors[0].message })
        }

    }


}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
module.exports = new UserController()