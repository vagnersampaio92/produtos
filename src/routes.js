const routes = require("express").Router()

const authMiddleware = require("./app/middleware/auth")

const SessionController = require("./app/controllers/User/SessionUser")
const UserController = require("./app/controllers/User/User")
const FavoriteController = require("./app/controllers/Favorite/Favorite")
const ListController = require("./app/controllers/List/ListProduct")


//rota pública para listar pordutos

routes.get("/listAllProduct/:page", ListController.listAll)

//rotas públicas do usuário
routes.post("/signin", SessionController.store)
routes.post("/signup", UserController.store)


routes.use(authMiddleware)

//rotas privadas do usuário
routes.get("/listUsersByid",UserController.listById)
routes.delete("/deleteUser", UserController.delete)
routes.put("/updateUser", UserController.update)
routes.get("/listalluser", UserController.listAlll)

//favorite
routes.post("/addfavorite", FavoriteController.store)
routes.get("/listAllProductByUser", FavoriteController.listAlll)
routes.delete("/deletefavorite/:product_id", FavoriteController.delete)


module.exports = routes;