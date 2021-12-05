const request = require('supertest');

const express = require('express')
const routes = require('../../../src/http/routes')

describe("Admin (e2e)", () => {

    let app;

    beforeAll(async () => {
        app = express()
        app.use(routes)
    })

    test('GET /admin/best-clients?start=<date>&end=<date> with limit 4 expects pass', async () => {
        return request(app)
            .get("/api/v1/admin/best-clients?start=2020-08-09 19:11:26&end=2020-08-20 19:11:26&limit=4")
            .set({profile_id: 2})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual([
                    {
                        "id": 1,
                        "fullName": "Harry Potter",
                        "paid": 442
                    },
                    {
                        "id": 2,
                        "fullName": "Mr Robot",
                        "paid": 442
                    },
                    {
                        "id": 3,
                        "fullName": "John Snow",
                        "paid": 200
                    },
                    {
                        "id": 4,
                        "fullName": "Ash Kethcum",
                        "paid": 2020
                    }
                ])
            })
    });

    test('GET /admin/best-clients?start=<date>&end=<date> expects limit 2 default pass', async () => {
        return request(app)
            .get("/api/v1/admin/best-clients?start=2020-08-09 19:11:26&end=2020-08-20 19:11:26")
            .set({profile_id: 2})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual([
                    {
                        "id": 1,
                        "fullName": "Harry Potter",
                        "paid": 442
                    },
                    {
                        "id": 2,
                        "fullName": "Mr Robot",
                        "paid": 442
                    }
                ])
            })
    });

    test('GET /admin/best-profession?start=<date>&end=<date> with limit 4 expects pass', async () => {
        return request(app)
            .get("/api/v1/admin/best-profession?start=2020-08-09 19:11:26&end=2020-08-20 19:11:26&limit=4")
            .set({profile_id: 2})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual([
                    {
                        "profession": "Fighter",
                        "total": 200
                    },
                    {
                        "profession": "Musician",
                        "total": 221
                    },
                    {
                        "profession": "Programmer",
                        "total": 2683
                    }
                ])
            })
    });

    test('GET /admin/best-profession?start=<date>&end=<date> expects limit 2 default pass', async () => {
        return request(app)
            .get("/api/v1/admin/best-profession?start=2020-08-09 19:11:26&end=2020-08-20 19:11:26")
            .set({profile_id: 2})
            .expect(200)
            .expect((response) => {
                expect(response.body).toStrictEqual([
                    {
                        "profession": "Fighter",
                        "total": 200
                    },
                    {
                        "profession": "Musician",
                        "total": 221
                    }
                ])
            })
    });

})
