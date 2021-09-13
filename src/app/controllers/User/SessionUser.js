const { User } = require('./../../models')

class SessionController {
    async store(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({ message: "Data invalid." })
        }

        let user = await User.findOne(

            { where: { email } })

        if (!user) {
            return res.status(401).json({ message: "User not found or Incorrect password." })
        }


        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ message: "User not found or Incorrect password." })
        }

        delete user.dataValues.password_hash

        return res.json({ user, token: user.generateToken()});
    }
}

module.exports = new SessionController()