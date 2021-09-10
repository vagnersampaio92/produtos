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
    async listAlll(req, res) { }
    async listById(req, res) { }
    async delete(req, res) { }
    async update(req, res) {
        let { body } = req
        try {

            if (body.email && !validateEmail(body.email)) {
                return res.status(401).json({ message: "invalid email" })
            }
            const user = await User.findOne({
                where: {
                    id: req.params.id
                },
            })

            await user.update(body);

            return res.json({ message: `success` });

        } catch (error) {
            return res.status(401).json({ message: "Error, invalid data" })
        }
    }


}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
module.exports = new UserController()