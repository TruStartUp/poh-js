import { Image } from 'image-js';

export default class Logo {
  constructor(pos, P5Img, imageUrl, p5) {
    this.p5 = p5;
    this.width = P5Img.width;
    this.height = P5Img.height;
    this.img = P5Img;
    this.eventualImage = Image.load(imageUrl);
    this.pos = pos;
    this.inside = false;
    this.dx = 0;
    this.dy = 0;
  }

  getImage() {
    return new Promise((resolve, reject) => {
      this.eventualImage
        .then((image) => resolve(image.data.join()))
        .catch(reject);
    });
  }

  getPos() {
    return this.pos;
  }

  draw() {
    this.p5.image(this.img, this.pos.x, this.pos.y);
  }

  mousePressed(x, y) {
    this.inside = this.checkBounds(x, y);
    if (this.inside) {
      this.dx = x - this.pos.x;
      this.dy = y - this.pos.y;
    }
  }

  mouseReleased() {
    this.inside = false;
  }

  mouseDragged(x, y) {
    if (this.inside) {
      this.pos = { x: x - this.dx, y: y - this.dy };
    }
  }

  checkBounds(x, y) {
    return ((x >= this.pos.x) && (x <= this.pos.x + this.width)
      && (y >= this.pos.y) && (y <= this.pos.y + this.height));
  }
}
