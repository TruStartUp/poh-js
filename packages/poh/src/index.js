import Hub from './handlers/Hub';
import { P5Handler, setHashingFunction } from './handlers/P5Handler';
/**
 * Poh Class snippet.
 */
export default class Poh {
  constructor(containerId, apiKey, callbackOnProof) {
    this.apiKey = apiKey;
    this.containerId = containerId;
    this.hub = new Hub();
    this.callbackOnProof = callbackOnProof;
  }

  /**
   *
   * @return {Promise<HashingSpace>}
   */
  get eventualHashingSpace() {
    return this.hub.getHashingSpace(this.apiKey);
  }

  initialize() {
    this.p5Instance = new P5Handler(this.containerId,
      'https://firebasestorage.googleapis.com/v0/b/trustartupcol.appspot.com/o/logos%2FTRU.png?alt=media&token=60c71486-8b58-4beb-8216-d1550c00b38d',
      320, '#D0CFCF', '#B4B1B1');
    this.p5Instance.initialize();
    setHashingFunction(this.callbackOnProof);
  }

  /**
   *
   * @param hash string the image hash to be proved
   * @return {Promise<boolean>}
   */
  validate(hash) {
    return new Promise((resolve, reject) => {
      this.eventualHashingSpace
        .then((hashingSpace) => hashingSpace.validate(hash))
        .then(resolve)
        .catch(reject);
    });
  }
}
