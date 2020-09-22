import P5 from 'p5';
import Puzzle from '../sketch/Puzzle';

let puzzle;
let componentCall;
const width = 320;
const image = require('../assets/puzzle/TRU.png');
const imageStar = require('../assets/puzzle/star64x64.png');
const imageCloud = require('../assets/puzzle/cloud64x64.png');
const imagePear = require('../assets/puzzle/pear64x64.png');

export class P5Handler {
  constructor(color) {
    this.color = color;
  }

  initialize() {
    // eslint-disable-next-line no-use-before-define
    this.p5 = new P5(this.main);
  }

  destroy() {
    delete this.p5;
  }

  // eslint-disable-next-line class-methods-use-this
  main(_p5) {
    const p5 = _p5;
    let img;
    let targetImg;
    let pearImg;
    let cloudImg;
    let starImg;
    let canvas;

    p5.preload = () => {
      img = p5.loadImage(image);
      targetImg = p5.loadImage(image);
      pearImg = p5.loadImage(imagePear);
      cloudImg = p5.loadImage(imageCloud);
      starImg = p5.loadImage(imageStar);
    };

    p5.setup = () => {
      puzzle = new Puzzle([pearImg, cloudImg, starImg], targetImg, img, width, p5);
      puzzle.setup();
      canvas = p5.createCanvas(width, width);
      canvas.parent('p5Canvas');
    };

    p5.draw = () => {
      puzzle.draw();
    };

    p5.mouseMoved = () => {
      puzzle.mouseMoved(p5.mouseX, p5.mouseY);
    };

    p5.mousePressed = () => {
      puzzle.mousePressed(p5.mouseX, p5.mouseY);
    };
    p5.mouseDragged = () => {
      if (p5.mouseX >= 0 && p5.mouseX <= width && p5.mouseY >= 0 && p5.mouseY <= width) {
        puzzle.mouseDragged(p5.mouseX, p5.mouseY);
      }
    };
    p5.mouseReleased = () => {
      if (p5.mouseX >= 0 && p5.mouseX <= width && p5.mouseY >= 0 && p5.mouseY <= width) {
        puzzle.mouseReleased();
        // eslint-disable-next-line no-use-before-define
        hashImageOnComponent();
      }
    };
  }
}

function hashImageOnComponent() {
  if (componentCall !== undefined) {
    componentCall(puzzle.sendHash());
  }
}

export function setHashingFunction(_func) {
  componentCall = _func;
}
