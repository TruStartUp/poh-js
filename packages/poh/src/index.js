import HashingSpace from "./handlers/HashingSpace";
/**
 * Poh Class snippet.
 */
export default class Poh {

  constructor(containerId, apiKey, callbackonProof) {
    this.callback
    this.containerId = containerId;


    this.hashingSpace = new HashingSpace(apiKey);
  }

  /**
   *
   * @param hash string the image hash to be proved
   * @return {Promise<boolean>}
   */
  validate(hash) {
    return new Promise((resolve, reject) => {
      this.hashingSpace.validate(hash)
        .then(resolve)
        .catch(reject)
    });
  }
}
