import { expect } from 'chai';

import hash from '../util/Hash';

describe('Hash', () => {
  it('should hash password when passed', async () => {
    const str = 'somedummypassword';
    const hashed = await hash.hashPassword(str);
    expect(hashed).to.be.an('string');
  });

  it('should return false when both passwords does not match', async () => {
    const password1 = 'dummy';
    const password2 = 'random';
    const hashedPassword = await hash.hashPassword(password2);
    const compare = await hash.comparePassword(password1, hashedPassword);
    expect(compare).to.be.equal(false);
  });

  it('should return true when both passwords match', async () => {
    const password1 = 'dummy';
    const password2 = 'dummy';
    const hashedPassword = await hash.hashPassword(password2);
    const compare = await hash.comparePassword(password1, hashedPassword);
    expect(compare).to.be.equal(true);
  });
});
