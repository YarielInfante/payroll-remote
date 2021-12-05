const request = require('supertest');

const express = require('express')
const routes = require('../../../src/http/routes')

describe("Balance (e2e)", () => {

    let app;

    beforeAll(async () => {
        app = express()
        app.use(routes)
    })

    test('POST /balances/deposit expects pass', async () => {
        return request(app)
            .post("/api/v1/balances/deposit")
            .set({profile_id: 4})
            .send({amount: 20})
            .expect(200)
    });


})
