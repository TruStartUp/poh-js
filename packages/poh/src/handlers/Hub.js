import { web3 } from "../utils";

export default class Hub {
  constructor(address) {
    this.instance = new web3.eth.Contract(Hub.abi, address);
    this.address = address;
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
