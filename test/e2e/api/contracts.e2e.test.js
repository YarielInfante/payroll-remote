const request = require('supertest');

const express = require('express')
const routes = require('../../../src/http/routes')

describe("Contracts (e2e)", () => {

    let app;

    beforeAll(async () => {
        app = express()
        app.use(routes)
    })

    test('GET /contracts/:id basic expects pass', async () => {
        return request(app)
            .get(`/api/v1/contracts/${2}`)
            .set({profile_id: 1})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual(
                    {
                        clientId: 1,
                        contractorId: 6,
                        createdAt: "2021-12-04T14:23:23.449Z",
                        id: 2,
                        status: "in_progress",
                        terms: "bla bla bla",
                        updatedAt: "2021-12-04T14:23:23.449Z"
                    }
                )
            })
    });

    test('GET /contracts expects pass', async () => {
        return request(app)
            .get("/api/v1/contracts")
            .set({profile_id: 1})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual([
                    {
                        clientId: 1,
                        contractorId: 6,
                        createdAt: "2021-12-04T14:23:23.449Z",
                        id: 2,
                        status: "in_progress",
                        terms: "bla bla bla",
                        updatedAt: "2021-12-04T14:23:23.449Z"
                    }
                ])
            })
    });


})
