import Web3 from 'web3';
import Target from './Target';
import Logo from './Logo';

const web3 = new Web3(new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co/2.0.1'));

export default class Puzzle {
  constructor(
    dummies, targetImg, logoImg, width,
    logoUrl, darkBackgroundColor, lightBackgroundColor, p5,
  ) {
    this.p5 = p5;
    this.positions = [];
    this.dummiesImg = dummies;
    this.targetImg = targetImg;
    this.logoImg = logoImg;
    this.logoUrl = logoUrl;
    this.width = width;
    this.darkBackground = darkBackgroundColor;
    this.lightBackground = lightBackgroundColor;
    this.colorHex = lightBackgroundColor;
  }

  setup() {
    this.dummmies = this.dummiesImg
      .map((dummy) => new Target(this.getRandomPosition(), dummy, this.p5));
    this.target = new Target(this.getRandomPosition(), this.targetImg, this.p5);
    this.logo = new Logo(this.getRandomPosition(), this.logoImg, this.logoUrl, this.p5);
  }

  distance() {
    const pixelDistance = Math.sqrt((this.target.getPos().x - this.logo.getPos().x) ** 2
      + (this.target.getPos().y - this.logo.getPos().y) ** 2);
    const maxPxDistance = Math.sqrt((this.width ** 2)
      + (this.width ** 2));
    return Number.parseInt(this.p5.map(pixelDistance, 0, maxPxDistance, 1, 255), 10);
  }

  getRandomInt() {
    return Math.floor(Math.random() * (this.width - this.logoImg.height));
  }

  getRandomPosition() {
    let pos = { x: this.getRandomInt(), y: this.getRandomInt() };
    while (!this.validatePos(pos)) {
      pos = { x: this.getRandomInt(), y: this.getRandomInt() };
    }
    this.positions.push(pos);
    return pos;
  }

  validatePos(pos) {
    let flag = true;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.positions.length; i++) {
      const p = this.positions[i];
      flag = flag && (Math.sqrt((p.x - pos.x) ** 2 + (p.y - pos.y) ** 2)) > (this
        .logoImg.height);
    }
    return flag;
  }

  sendHash() {
    return new Promise((resolve, reject) => {
      this.logo.getImage()
        .then((image) => web3.utils.soliditySha3(image))
        .then((imgHash) => web3.utils.soliditySha3(imgHash, this.distance()))
        .then(resolve)
        .catch(reject);
    });
  }

  draw() {
    this.p5.background(this.p5.color(this.colorHex));
    this.dummmies.forEach((dummy) => dummy.draw());
    this.target.draw();
    this.logo.draw();
  }

  mouseMoved(x, y) {
    this.colorHex = ((x >= 0 && x < this.width) && (y >= 0 && y < this
      .width)) ? this.lightBackground : this.darkBackground;
  }

  mousePressed(x, y) {
    this.logo.mousePressed(x, y);
  }

  mouseReleased() {
    this.logo.mouseReleased();
  }

  mouseDragged(x, y) {
    this.logo.mouseDragged(x, y);
  }
}
