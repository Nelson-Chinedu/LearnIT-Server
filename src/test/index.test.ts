import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('test baseurl endpoint', () => {
  it('should display welcome', (done: Mocha.Done) => {
    chai
      .request(app)
      .get('/')
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to LearnIT');
        done();
      });
  });
});
