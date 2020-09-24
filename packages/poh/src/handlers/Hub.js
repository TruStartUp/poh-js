import { web3, HUB_ADDRESS } from "../utils";
import HubContract from '../../contracts/Hub.json';

export default class Hub {
  constructor() {
    this.instance = new web3.eth.Contract(HubContract.abi, HUB_ADDRESS);
    this.address = HUB_ADDRESS;
  }
  getHashingSpaces(index) {
    return new Promise((resolve, reject) => {
      this.instance.methods.userHashingSpaces(index)
        .call()
        .then(resolve)
        .catch(reject);
    })
  }
}
