import { web3 } from '../utils';
import HSContract from '../../contracts/HashingSpace.json';

export default class HashingSpace {
  constructor(address) {
    this.instance = new web3.eth.Contract(HSContract.abi, address);
  }

  validate(testImgHash) {
    return new Promise((resolve, reject) => {
      this.instance.methods.validate(testImgHash)
        .call()
        .then(resolve)
        .catch(reject);
    });
  }
}
