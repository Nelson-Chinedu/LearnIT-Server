import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app, { AppDataSource } from '../index';

import { Account } from '../db';

import testUser from './mock-data/auth';

import Hash from '../util/Hash';

chai.use(chaiHttp);

const prefix = '/api/v1';

describe('/auth/signin', () => {
  before(async () => {
    await AppDataSource.manager.delete(Account, {});
    const hashedPassword = await Hash.hashPassword(testUser[7].password);
    const newAccount = AppDataSource.manager.create(Account, {
      email: 'johndoe@email.com',
      password: hashedPassword,
    });
    await AppDataSource.manager.save(newAccount);
  });

  it('should not signin when fields are empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[10])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should not signin when email field is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[11])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"email" is not allowed to be empty');
        done();
      });
  });

  it('should not signin when password field is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[12])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          '"password" is not allowed to be empty'
        );
        done();
      });
  });

  it('should not signin when email is invalid', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[13])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"email" must be a valid email');
        done();
      });
  });

  it('should not signin when password length is less than 8', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[14])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          '"password" length must be at least 8 characters long'
        );
        done();
      });
  });

  it('should not signin when user is not found by email', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[15])
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Invalid email address or password');
        done();
      });
  });

  it('should not signin when password does not matched hashed password', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[16])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid email address or password');
        done();
      });
  });

  it('should signin when credentials are valid', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signin`)
      .send(testUser[17])
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Logged in successfully');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
