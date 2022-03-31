import { expect } from 'chai';

import Token from '../util/Token';

describe('Hash', () => {
  it('should create token', () => {
    const token = Token.createToken(
      { id: '92992992928882' },
      'somerandomstring',
      '1d'
    );

    expect(token).to.be.an('string');
  });
});
