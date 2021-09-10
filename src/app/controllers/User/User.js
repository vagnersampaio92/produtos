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
    async listAlll(req, res) {
        try {
            const user = await User.findAll({
                attributes: ['id','name','email']
            })
            res.json(user);

        } catch (error) {
            return res.status(401).json({ message: error })
        }
    }
    async listById(req, res) {
        try {
            const user = await User.findOne({
                attributes: ['id','name','email'],
                where: {
                    id: req.params.id
                }
            })
            
            if (!user) {
                return res.status(404).json({ message: 'User not found.' })
            } else {
                res.json(user);
            }
        } catch (error) {
            return res.status(401).json({ message: error })
        }
     }
    async delete(req, res) {
        try {
            const user = await User.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            if (user === 0) {
                return res.status(404).json({ message: 'User not found.' })
            } else {
                res.json({ message: `Success, ${user} deleted users.` });
            }


        } catch (error) {
            return res.status(401).json({ message: error })
        }
    }
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
            return res.json({ message: `success` })

        } catch (error) {
            return res.status(401).json({ message: "Error, invalid data" })
        }
    }


}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}
module.exports = new UserController()