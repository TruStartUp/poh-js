import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import HashingSpace from '../src/handlers/HashingSpace';
import HubContract from '../contracts/Hub.json';
import { web3 } from '../src/utils';
import Hub from "../src/handlers/Hub";

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Hashing Space', () => {
  let owner, alice, bob;
  let hub;
  const imageHash = '0x64dd2a0be7878a022d654ad31c0e32a0cf340c4cbdd77e836ff1bb6bcd1bc104';
  const validHash = '0x0b1dbcf7d4964ab142351551cac23f735bf628f1fcb467e3d791f8fd3234ecf3';
  const invalidHash = '0xdda34dbd043318eb4ed0280a005e17863f9ecd16e496669f5ddf83cc0e27394b';
  beforeEach(async () => {
    [owner, alice, bob] = await web3.eth.getAccounts();
    const hubDeploySign = new web3.eth.Contract(HubContract.abi).deploy({ data: HubContract.bytecode });
    const hubInstance = await hubDeploySign.send({
      from: owner,
      gas: await hubDeploySign.estimateGas({ from: owner })
    });
    hub = new Hub(hubInstance._address);
  });
  it('should be an instance of HashingSpace', () => {
    return hub.addHashingSpace(imageHash, 'test', alice, owner)
      .then(() => hub.getApiKey(0, alice))
      .then((apiKey) => hub.getHashingSpace(apiKey))
      .then((hashingSpace) => expect(hashingSpace instanceof HashingSpace));
  });
  it('should validate a valid hash on the hashing space', () => {
    return hub.addHashingSpace(imageHash, 'test', alice, owner)
      .then(() => hub.getApiKey(0, alice))
      .then((apiKey) => hub.getHashingSpace(apiKey))
      .then((hashingSpace) => hashingSpace.validate(validHash))
      .then((proof) => expect(proof).to.be.true)
  });
  it('should validate an invalid hash on the hashing space', () => {
    return hub.addHashingSpace(imageHash, 'test', alice, owner)
      .then(() => hub.getApiKey(0, alice))
      .then((apiKey) => hub.getHashingSpace(apiKey))
      .then((hashingSpace) => hashingSpace.validate(invalidHash))
      .then((proof) => expect(proof).to.be.false)
  });
});

