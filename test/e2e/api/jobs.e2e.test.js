const request = require('supertest');

const express = require('express')
const routes = require('../../../src/http/routes')

describe("Jobs (e2e)", () => {

    let app;

    beforeAll(async () => {
        app = express()
        app.use(routes)
    })

    test('GET /jobs/unpaid expects pass', async () => {
        return request(app)
            .get("/api/v1/jobs/unpaid")
            .set({profile_id: 2})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual([
                    {
                        "contractId": 3,
                        "description": "work",
                        "id": 3,
                        "paid": null,
                        "paymentDate": null
                    },
                    {
                        "contractId": 4,
                        "description": "work",
                        "id": 4,
                        "paid": null,
                        "paymentDate": null
                    }
                ])
            })
    });

    test('POST /jobs/:job_id/pay expects pass', async () => {
        return request(app)
            .post(`/api/v1/jobs/${2}/pay`)
            .set({profile_id: 1})
            .expect(200)
    });


})
