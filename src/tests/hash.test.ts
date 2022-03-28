import { expect } from 'chai';

import hash from '../util/Hash';

describe('Hash', () => {
  it('should hash password when passed', async () => {
    const str = 'somedummypassword';
    const hashed = await hash.hashPassword(str);
    expect(hashed).to.be.an('string');
  });
});
