const request = require('supertest')
const faker = require('faker')
const app = require('../../src/app')

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
        console.log(response.body)
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
})