const routes = require("express").Router()

const authMiddleware = require("./app/middleware/auth")

const SessionController = require("./app/controllers/User/SessionUser")
const UserController = require("./app/controllers/User/User")
const FavoriteController = require("./app/controllers/Favorite/Favorite")
const ListController = require("./app/controllers/List/ListProduct")


//rota pública para listar pordutos

routes.get("/listAllProduct/:page", ListController.listAll)

//rotas públicas do usuário
routes.post("/singin", SessionController.store)
routes.post("/singup", UserController.store)
routes.put("/updateuser/:id", UserController.update)

routes.get("/listalluser", UserController.listAlll)
routes.get("/listusersbyid/:id",UserController.listById)

routes.use(authMiddleware)

//rotas privadas do usuário
routes.get("/listusersbyid",UserController.listById)
routes.delete("/deleteuser", UserController.delete)

//favorite
routes.post("/addfavorite", FavoriteController.store)
routes.get("/listAllProductByUser", FavoriteController.listAlll)
routes.delete("/deletefavorite/:product_id", FavoriteController.delete)

routes.get("/dashboard", (req, res) => {
  return res.status(200).send()
});

module.exports = routes;