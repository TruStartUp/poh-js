import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Hub from '../src/handlers/Hub';
import { HUB_ADDRESS } from '../src/utils';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Hub', () => {
  it('should be an instance of Hub', () => {
    return expect(new Hub() instanceof Hub);
  });
  it('should be the Hub address', () => {
    const hub = new Hub();
    return expect(hub.address).to.eq(HUB_ADDRESS);
  });
});

