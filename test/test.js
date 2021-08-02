const app = require('../routes/users_route.js');
const server = require("../app.js");
const expect = require('chai').expect;
const request = require('supertest');

describe('GET /user', () => {   

    it('OK, getting user information', (done) => {
        request(app).get('/user')
            .send({
                USER_EMAIL: "Demo12@gmail.com",
                PASSWORD: "Jindal@123",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('token');
                expect(body).to.contain.property('User_id');
                done();
            })
            .catch((err) => done(err));
    });

    it('Fail, user requires information', (done) => {
        request(app).get('/user')
            .send({  USER_EMAIL: "Demo12@gmail.com" })
            .then((res) => {
                const body = res.body;
                expect(body.errors.text.name)
                    .to.equal('ValidatorError')
                done();
            })
            .catch((err) => done(err));
    });
})