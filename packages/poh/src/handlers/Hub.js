import { send, web3, HUB_ADDRESS } from '../utils';
import HubContract from '../../contracts/Hub.json';
import HashingSpace from './HashingSpace';

export default class Hub {
  constructor(address) {
    this.address = address || HUB_ADDRESS;
    this.instance = new web3.eth.Contract(HubContract.abi, this.address);
  }

  addHashingSpace(imageHash, name, user, from = '') {
    return new Promise((resolve, reject) => {
      send(this.instance.methods.addHashingSpace(imageHash, name, user), from)
        .then(resolve)
        .catch(reject);
    });
  }

  getApiKey(index, user, from = '') {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts()
        .then(([account]) => this.instance.methods.getApiKey(index, user)
          .call({ from: from || account }))
        .then(resolve)
        .catch(reject);
    });
  }

  getHashingSpace(apiKey) {
    return new Promise((resolve, reject) => {
      this.instance.methods.getHashingSpace(apiKey)
        .call()
        .then((hashingSpaceAddress) => new HashingSpace(hashingSpaceAddress))
        .then(resolve)
        .catch(reject);
    });
  }
}
