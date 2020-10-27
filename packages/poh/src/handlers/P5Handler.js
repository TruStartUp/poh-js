import P5 from 'p5';
import Puzzle from '../sketch/Puzzle';

let puzzle;
let componentCall;
const imageStar = require('../assets/star.png');
const imageCloud = require('../assets/cloud.png');
const imagePear = require('../assets/pear.png');

export class P5Handler {
  constructor(containerId = 'p5Canvas', logoUrl, width, lightBackgroundColor, darkBackgroundColor) {
    this.containerId = containerId;
    this.logoUrl = logoUrl;
    this.width = width;
    this.lightBackgroundColor = lightBackgroundColor;
    this.darkBackgroundColor = darkBackgroundColor;
  }

  initialize() {
    // eslint-disable-next-line no-use-before-define
    this.p5 = new P5(this.main.bind(this));
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

    p5.preload = async () => {
      img = await p5.loadImage(this.logoUrl);
      targetImg = await p5.loadImage(this.logoUrl);
      pearImg = p5.loadImage(imagePear);
      cloudImg = p5.loadImage(imageCloud);
      starImg = p5.loadImage(imageStar);
    };

    p5.setup = () => {
      puzzle = new Puzzle(
        [pearImg, cloudImg, starImg],
        targetImg,
        img,
        this.width,
        this.logoUrl,
        this.lightBackgroundColor,
        this.darkBackgroundColor,
        p5,
      );
      puzzle.setup();
      canvas = p5.createCanvas(this.width, this.width);
      canvas.parent(this.containerId);
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
      if (p5.mouseX >= 0 && p5.mouseX <= this.width && p5.mouseY >= 0 && p5.mouseY <= this.width) {
        puzzle.mouseDragged(p5.mouseX, p5.mouseY);
      }
    };
    p5.mouseReleased = () => {
      if (p5.mouseX >= 0 && p5.mouseX <= this.width && p5.mouseY >= 0 && p5.mouseY <= this.width) {
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
