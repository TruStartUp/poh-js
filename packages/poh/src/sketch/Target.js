export default class Target {
  constructor(pos, img, p5) {
    this.p5 = p5;
    this.width = img.width;
    this.height = img.height;
    this.img = img;
    this.pos = pos;
    this.shadow();
  }

  draw() {
    this.p5.image(this.img, this.pos.x, this.pos.y);
  }

  getPos() {
    return this.pos;
  }

  shadow() {
    this.img.filter(this.p5.GRAY);
    this.img.loadPixels();
    for (let x = 0; x < this.img.width; x += 1) {
      for (let y = 0; y < this.img.height; y += 1) {
        const index = (x + y * this.img.width) * 4;
        if (this.img.pixels[index + 3] !== 0) {
          if (this.img.pixels[index]) this.img.pixels[index] = 255;
          if (this.img.pixels[index + 1]) this.img.pixels[index + 1] = 255;
          if (this.img.pixels[index + 2]) this.img.pixels[index + 2] = 255;
          this.img.pixels[index + 3] = 255;
        }
      }
    }
    this.img.updatePixels();
  }
}
