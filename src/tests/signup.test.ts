import 'reflect-metadata';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app, { AppDataSource } from '../index';

import testUser from './mock-data/auth';

import { Account } from '../db';

import hash from '../util/Hash';

chai.use(chaiHttp);

const prefix = '/api/v1';

describe('/auth/signup', () => {
  before(async () => {
    await AppDataSource.manager.delete(Account, {});
    const hashedPassword = await hash.hashPassword(testUser[7].password);
    const newAccount = AppDataSource.manager.create(Account, {
      email: 'johndoe@email.com',
      password: hashedPassword,
    });
    await AppDataSource.manager.save(newAccount);
  });

  it('should not signup when all input fields are empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[0])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should not signup when firstname is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[1])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          '"firstname" is not allowed to be empty'
        );
        done();
      });
  });
  it('should not signup when lastname is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[2])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          '"lastname" is not allowed to be empty'
        );
        done();
      });
  });
  it('should not signup when email address is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[3])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"email" is not allowed to be empty');
        done();
      });
  });
  it('should not signup when password is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[4])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          '"password" is not allowed to be empty'
        );
        done();
      });
  });
  it('should not signup when email is invalid', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[5])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"email" must be a valid email');
        done();
      });
  });
  it('should not signup when password length is less than 8', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[6])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          '"password" length must be at least 8 characters long'
        );
        done();
      });
  });
  it('should not signup when role is empty', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[8])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"role" is not allowed to be empty');
        done();
      });
  });
  it('should not signup when user already exist', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[7])
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should signup when all fields are valid', (done: Mocha.Done) => {
    chai
      .request(app)
      .post(`${prefix}/auth/signup`)
      .send(testUser[9])
      .end((_err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Account created');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
