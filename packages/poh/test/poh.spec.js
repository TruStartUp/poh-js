import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Poh from '../src';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('PoH', () => {
  let onProof;
  beforeEach(() => {
    onProof = (value) => expect(typeof value).to.eq('boolean');
  });
  it('should be an instance of Poh', () => {
    return expect(new Poh('test', 'apikey', onProof) instanceof Poh);
  });
  // it('Call the function passed when a proof is requested', () => {
  //   const p = new Poh('test2', 'apikey2', onProof);
  //   const imageHash = '0xdde9efca1ecfbadf34253c9a6ab6812280da630a1d96087e64f87b3935bfcfef';
  //   return expect(p.validate(imageHash) instanceof Boolean);
  // })
});

