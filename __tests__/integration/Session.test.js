const request = require('supertest')
const faker = require('faker')
const app = require('./../../src/app')

const truncate = require("../utils/truncate");


describe('Authenticate',()=>{
    beforeEach(async () => {
        await truncate();
      });
    it('testa se está criando usuário',async()=>{
        const response = await request(app)
        .post('/singup')
        .send({
            email: faker.internet.email(),
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(200)

        
    })
    it('valida se é possível criar 2 usuário com o mesmo email',async()=>{
        const response = await request(app)
        .post('/singup')
        .send({
            email:"exist@exist.com",
            name:faker.name.findName(),
            password:faker.internet.password()
        })
        const responseEx = await request(app)
        .post('/singup')
        .send({
            email:"exist@exist.com",
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(200)

        expect(responseEx.status).toBe(401)
    })
    it('valida email',async()=>{
        let response = await request(app)
        .post('/singup')
        .send({
            email:"a",
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)

        response = await request(app)
        .post('/singup')
        .send({
            email:"",
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)

        response = await request(app)
        .post('/singup')
        .send({
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)

        response = await request(app)
        .post('/singup')
        .send({
            email: faker.internet.email(),
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(200)

        response = await request(app)
        .post('/singup')
        .send({
            email:"a@.",
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)

        response = await request(app)
        .post('/singup')
        .send({
            email:"@a.",
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)
        
        response = await request(app)
        .post('/singup')
        .send({
            email:"@.a",
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)

        
    })
    it('valida dados',async()=>{
        let response = await request(app)
        .post('/singup')
        .send({
            
            name:faker.name.findName(),
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)
        response = await request(app)
        .post('/singup')
        .send({
            email: faker.internet.email(),
            
            password:faker.internet.password()
        })

        expect(response.status).toBe(401)

        esponse = await request(app)
        .post('/singup')
        .send({
            email: faker.internet.email(),
            name:faker.name.findName(),
           
        })

        expect(response.status).toBe(401)

        
    })
    
})