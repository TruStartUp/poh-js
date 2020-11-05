import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Hub from '../src/handlers/Hub';
import HashingSpace from '../src/handlers/HashingSpace';
import { HUB_ADDRESS } from '../src/utils';
import { web3 } from '../src/utils';

chai.use(chaiAsPromised);

const { expect } = chai;
const imageHash = '0xdde9efca1ecfbadf34253c9a6ab6812280da630a1d96087e64f87b3935bfcfef';

describe('Hub', () => {
  let owner, alice;
  beforeEach(async () => {
    [owner, alice] = await web3.eth.getAccounts();
  });
  it('should be an instance of Hub', () => {
    return expect(new Hub() instanceof Hub);
  });
  it('should be the Hub address', () => {
    const hub = new Hub();
    return expect(hub.address).to.eq(HUB_ADDRESS);
  });
  context('Operational', () => {
    let hub;
    beforeEach(() => {
      hub = new Hub();
    });
    it('should add a new hashing space', () => {
      return hub.addHashingSpace(imageHash, 'name', alice, owner)
        .then((tx) => expect(tx.transactionHash).to.match(/0x[0-9a-fA-F]{64}/));
    });
    it('should return an apiKey given an index and user', () => {
      return hub.addHashingSpace(imageHash, 'name', alice, owner)
        .then(() => hub.getApiKey(0, alice))
        .then((apiKey) => expect(apiKey).to.match(/0x[0-9a-fA-F]{64}/));
    });
    it('should return a hashing space instance given an apiKey', () => {
      return hub.addHashingSpace(imageHash, 'name', alice, owner)
        .then(() => hub.getApiKey(0, alice))
        .then((apiKey) => hub.getHashingSpace(apiKey))
        .then((hashingSpace) => expect(hashingSpace instanceof HashingSpace));
    });
  });
});

