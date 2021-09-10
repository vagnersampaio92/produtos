const routes = require("express").Router()

const authMiddleware = require("./app/middleware/auth")

const SessionController = require("./app/controllers/User/SessionUser")
const UserController = require("./app/controllers/User/User")
const FavoriteController = require("./app/controllers/Favorite/Favorite")


routes.post("/singin", SessionController.store)
routes.post("/singup", UserController.store)
routes.put("/updateuser/:id", UserController.update)
routes.delete("/deleteuser/:id", UserController.delete)
routes.get("/listalluser", UserController.listAlll)
routes.get("/listusersbyid/:id",UserController.listById)




routes.use(authMiddleware)


routes.get("/listusersbyid",UserController.listById)

routes.post("/addfavorite", FavoriteController.store)
routes.delete("/deletefavorite/:product_id", FavoriteController.delete)

routes.get("/dashboard", (req, res) => {
  return res.status(200).send()
});

module.exports = routes;