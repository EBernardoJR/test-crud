const request = require('supertest')
const app = require('../../src/app')
var faker = require('faker');


describe('Users controller tests', () => {

    it('Create user - no body', async () => {

        const response = await request(app)
            .post('/signup')
            .send({})

        expect(response.status).toBe(400)
    })

    it('Create user', async () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = '12345678'
        const phones = [{
            number: faker.phone.phoneNumber(),
            ddd: '99'
        }]


        const response = await request(app)
            .post('/signup')
            .send({
                email,
                password,
                phones,
                name
            })

        expect(response.status).toBe(200)
    })
    it('Create user - email already used', async () => {
        const name = faker.name.findName()
        const email = 'teste@gmail.com'
        const password = '12345678'
        const phones = [{
            number: faker.phone.phoneNumber(),
            ddd: '99'
        }]


        const response = await request(app)
            .post('/signup')
            .send({
                email,
                password,
                phones,
                name
            })

        expect(response.status).toBe(403)
    })
    it('Login - user not exist', async () => {

        const response = await request(app)
            .post('/signin')
            .send({
                email: 'jest@test.com',
                password: '1234567'
            })

        expect(response.status).toBe(401)
    })
    it('Login - password incorrect', async () => {

        const response = await request(app)
            .post('/signin')
            .send({
                email: 'teste100@gmail.com',
                password: '12347676657'
            })

        expect(response.status).toBe(401)
    })
    it('Login', async () => {

        const response = await request(app)
            .post('/signin')
            .send({
                email: 'teste100@gmail.com',
                password: '12345678'
            })

        expect(response.status).toBe(200)
    })

    it('Get user - token not sended', async () => {

        const response = await request(app)
            .get('/user/60df9529e422a0a7f62a2c8f')
            .send({})

        expect(response.status).toBe(400)
    })
    it('Get user - token invalid', async () => {

        const response = await request(app)
            .get('/user/60df9529e422a0a7f62a2c8f')
            .set({ Authorization: '60df5a91c980598abe9e8b0c' })
            .send({})

        expect(response.status).toBe(401)
    })
    it('Get user - expired token', async () => {

        const response = await request(app)
            .get('/user/60df7a91c980598abe4e8b0a')
            .set({ Authorization: '60df7a91c980598abe4e8b0c' })
            .send({})

        expect(response.status).toBe(401)
    })

    it('Get user', async () => {

        const login = await request(app)
            .post('/signin')
            .send({
                email: 'teste100@gmail.com',
                password: '12345678'
            })
        const response = await request(app)
        .get(`/user/${login.body.userId}`)
        .set({ Authorization: login.body.token })
        .send({})

        expect(response.status).toBe(200)
    })
})