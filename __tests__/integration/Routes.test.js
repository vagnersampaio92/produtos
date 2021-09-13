const request = require('supertest')
const faker = require('faker')
const app = require('../../src/app')
const axios = require('axios')

const truncate = require("../utils/truncate");


describe('teste de rotas', () => {
    beforeEach(async () => {
        await truncate();
    });
    async function login(){
        const email = faker.internet.email()
        const password = faker.internet.password()
        response = await request(app)
        .post('/signup')
        .send({
            email: email,
            name: faker.name.findName(),
            password: password
        })
        expect(response.status).toBe(200)
        response = await request(app)
        .post('/signin')
        .send({
            email: email,
            password: password
        })
    
        return response.body.token
    }
    it('testa se está criando usuário', async () => {
        const response = await request(app)
        .post('/signup')
        .send({
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: faker.internet.password()
        })
        expect(response.status).toBe(200)
    })
    it('valida se é possível criar 2 usuário com o mesmo email', async () => {
        const response = await request(app)
            .post('/signup')
            .send({
                email: "exist@exist.com",
                name: faker.name.findName(),
                password: faker.internet.password()
            })
        const responseEx = await request(app)
            .post('/signup')
            .send({
                email: "exist@exist.com",
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(200)

        expect(responseEx.status).toBe(401)
    })
    it('valida email', async () => {
        let response = await request(app)
            .post('/signup')
            .send({
                email: "a",
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)

        response = await request(app)
            .post('/signup')
            .send({
                email: "",
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)

        response = await request(app)
            .post('/signup')
            .send({
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)

        response = await request(app)
            .post('/signup')
            .send({
                email: faker.internet.email(),
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(200)

        response = await request(app)
            .post('/signup')
            .send({
                email: "a@.",
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)

        response = await request(app)
            .post('/signup')
            .send({
                email: "@a.",
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)

        response = await request(app)
            .post('/signup')
            .send({
                email: "@.a",
                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)


    })
    it('valida dados', async () => {
        let response = await request(app)
            .post('/signup')
            .send({

                name: faker.name.findName(),
                password: faker.internet.password()
            })

        expect(response.status).toBe(401)
        response = await request(app)
            .post('/signup')
            .send({
                email: faker.internet.email(),

                password: faker.internet.password()
            })

        expect(response.status).toBe(401)

        esponse = await request(app)
            .post('/signup')
            .send({
                email: faker.internet.email(),
                name: faker.name.findName(),

            })

        expect(response.status).toBe(401)


    })
    it('testa login', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        let response = await request(app)
            .post('/signup')
            .send({
                email: email,
                name: faker.name.findName(),
                password: password
            })
        expect(response.status).toBe(200)
        response = await request(app)
            .post('/signin')
            .send({
                email: email,
                password: password
            })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
    })
    it('teste com password invalidos', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        let response = await request(app)
            .post('/signup')
            .send({
                email: email,
                name: faker.name.findName(),
                password: password
            })
        expect(response.status).toBe(200)

        response = await request(app)
            .post('/signin')
            .send({
                email: email,
                password: faker.internet.password()
            })
        expect(response.status).toBe(401)
        response = await request(app)
            .post('/signin')
            .send({
                email: email
            })
        expect(response.status).toBe(401)

    })
    it('teste email inválido', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        let response = await request(app)
            .post('/signup')
            .send({
                email: email,
                name: faker.name.findName(),
                password: password
            })
        expect(response.status).toBe(200)

        response = await request(app)
            .post('/signin')
            .send({
                email: faker.internet.email(),
                password: password
            })
        expect(response.status).toBe(401)

    })
    it('teste token', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        let response = await request(app)
            .post('/signup')
            .send({
                email: email,
                name: faker.name.findName(),
                password: password
            })
        expect(response.status).toBe(200)

        response = await request(app)
            .post('/signin')
            .send({
                email: email,
                password: password
            })
        response = await request(app)
            .get('/listAllProductByUser')
            .set("Authorization", `Bearer ${response.body.token}`)

        expect(response.status).toBe(200)

        response = await request(app)
            .get('/listAllProductByUser')
            .set("Authorization", `Bearer `)
        expect(response.status).toBe(401)

        response = await request(app)
            .get('/listAllProductByUser')
        expect(response.status).toBe(401)

        response = await request(app)
            .get('/listAllProductByUser')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMxMzc4NjA4fQ.GGeuAaDx7NJb1EhVSC2Iz5_cgvCuqNiC8XJAHjlL6rY1`)
        expect(response.status).toBe(401)


    })
    it('testa listagem de todos os usuários', async () => {
        let response = await request(app)
            .get('/listalluser')
        expect(response.status).toBe(401)

       const token = await login()
    
        response = await request(app)
        .get('/listalluser')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
    it('testa dados pelo id', async () => {
        let response = await request(app)
            .get('/listUsersByid')
        expect(response.status).toBe(401)

       const token = await login()
    
        response = await request(app)
        .get('/listUsersByid')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .get('/listUsersByid')
        .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImlhdCI6MTYzMTQ4NTExOX0.r5idOAjTjIoZnCUDRFbEPTyueYAQz8zxusWuXznGZKc`)
        expect(response.status).toBe(404)
    })
    it('testa delete', async () => {
        let response = await request(app)
            .get('/listUsersByid')
        expect(response.status).toBe(401)

       const token = await login()
    
        response = await request(app)
        .get('/listUsersByid')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .delete('/deleteUser')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .get('/listUsersByid')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)

        response = await request(app)
        .delete('/deleteUser')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)
    })
    it('testa update dados', async () => {
    
        const token = await login()
    
        response = await request(app)
        .get('/listUsersByid')
        .set("Authorization", `Bearer ${token}`)
        const {name, email} = response.body
        expect(response.status).toBe(200)

        response = await request(app)
        .put('/updateUser')
        .send({
            email: faker.internet.email(),
            name: faker.name.findName(),
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .get('/listUsersByid')
        .set("Authorization", `Bearer ${token}`)

        expect(response.body.name).not.toBe(name)
        expect(response.body.name).not.toBe(email)

        response = await request(app)
        .put('/updateUser')
        .send({
            email: "@",
            name: faker.name.findName(),
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)

    })
    it('testa update da senha', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()
        response = await request(app)
        .post('/signup')
        .send({
            email: email,
            name: faker.name.findName(),
            password: password
        })
        expect(response.status).toBe(200)

        response = await request(app)
        .post('/signin')
        .send({
            email: email,
            password: password
        })
        expect(response.status).toBe(200)

        const passwordNew = faker.internet.password()
        response = await request(app)
        .put('/updateUser')
        .send({
            password:passwordNew
        })
        .set("Authorization", `Bearer ${response.body.token}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .post('/signin')
        .send({
            email: email,
            password: passwordNew
        })
        expect(response.status).toBe(200)

        response = await request(app)
        .post('/signin')
        .send({
            email: email,
            password: password
        })
        expect(response.status).toBe(401)


    })
    it('testa rota que lista os produtos', async () => {
        const numer = faker.datatype.number({
            'min': 1,
            'max': 440
        });
        let response = await request(app)
        .get(`/listAllProduct/${numer}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .get('/listAllProduct/441')
        expect(response.status).toBe(404)

        response = await request(app)
        .get(`/listAllProduct/${numer}`)
        expect(response.status).toBe(200)


    })
    it('testa a adição de um produto na lista de favoritos', async () => {
        const page = faker.datatype.number({
            'min': 1,
            'max': 439
        });
        const product = faker.datatype.number({
            'min': 1,
            'max': 100
        });
        const failId = faker.datatype.number({
            'min': 1,
            'max': 99
        });
        const failIdLong = faker.datatype.number({
            'min': 100,
            'max': 99999
        });
        const token = await login()
        const responseProducts = await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${page}`)
        const {id, image, brand, price, title} = responseProducts.data.products[product] 
        
        
        let response = await request(app)
        .post('/addfavorite')
        .send({
            product_id: id
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.product_id).toBe(id);
        expect(response.body.price).toBe(price);
        expect(response.body.image).toBe(image);
        expect(response.body.title).toBe(title);
        expect(response.body.url).toBe(`http://challenge-api.luizalabs.com/api/product/${id}/`);
        expect(response.body).not.toHaveProperty("brand");;
        
        response = await request(app)
        .post('/addfavorite')
        .send({
            product_id: id
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(401)

        response = await request(app)
        .post('/addfavorite')
        .send({
            product_id: failId
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)

        response = await request(app)
        .post('/addfavorite')
        .send({
            product_id: failIdLong
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)


        response = await request(app)
        .delete('/deleteUser')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)

        response = await request(app)
        .post('/addfavorite')
        .send({
            product_id: id
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)


    })
    it('testa delete de um produto favorito', async () => {
        const page = faker.datatype.number({
            'min': 1,
            'max': 439
        });
        const product = faker.datatype.number({
            'min': 1,
            'max': 100
        });
        const token = await login()
        const responseProducts = await axios.get(`http://challenge-api.luizalabs.com/api/product/?page=${page}`)
        const {id, image, brand, price, title} = responseProducts.data.products[product] 
        
        let response = await request(app)
        .post('/addfavorite')
        .send({
            product_id: id
        })
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.product_id).toBe(id);
        expect(response.body.price).toBe(price);
        expect(response.body.image).toBe(image);
        expect(response.body.title).toBe(title);
        expect(response.body.url).toBe(`http://challenge-api.luizalabs.com/api/product/${id}/`);
        expect(response.body).not.toHaveProperty("brand");;
  
        response = await request(app)
        .get('/listAllProductByUser')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body[0].product_id).toBe(id);

        response = await request(app)
        .delete(`/deletefavorite/${id}`)
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
    
        response = await request(app)
        .get('/listAllProductByUser')
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(0);

        response = await request(app)
        .delete(`/deletefavorite/${product}`)
        .set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(404)
    })
})