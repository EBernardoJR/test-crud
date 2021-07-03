const request = require('supertest')
const app = require('../../src/app')



describe('Server test', () => {

    it('Connect to app', async () => {

        const response = await request(app)
            .get('/test')
            .send({})

        expect(response.status).toBe(200)
    })

})