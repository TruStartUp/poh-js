/**
 * Poh Class snippet.
 */
export default class Poh {
  constructor(containerId, apiKey, callbackOnProof) {
    this.apiKey = apiKey;
    this.containerId = containerId;
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
