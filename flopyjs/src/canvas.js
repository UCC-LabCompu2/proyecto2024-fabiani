import { Node2D } from './core.js';
import { Vector2D } from './vector.js';


export class Color {
  constructor(r = 255, g = 255, b = 255, a = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static get white() {
    return new Color(255, 255, 255, 255);
  }

  static get black() {
    return new Color(0, 0, 0, 255);
  }

  static get red() {
    return new Color(255, 0, 0, 255);
  }

  static get green() {
    return new Color(0, 255, 0, 255);
  }

  static get blue() {
    return new Color(0, 0, 255, 255);
  }

  toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a / 255})`;
  }
}


/**
 * Clase que representa un rectángulo coloreado en el lienzo.
 * @extends Node2D
 */
class ColorRect extends Node2D {
    /**
     * Crea un nuevo rectángulo coloreado.
     * @param {Color} color - El color
     * @param {Vector2D} size - Tamaño del rectangulo
    */
    constructor(color, size) {
        super();
        this.size = size;
        this.color = color;
    }
    /**
     * Dibuja el rectángulo coloreado en el lienzo.
     * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado 2D del lienzo.
     */
    render(ctx) {
        ctx.fillStyle = this.color.toString();
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

/**
 * Clase que representa una textura en el lienzo.
 * @extends Node2D
 */
class Texture extends Node2D {
    /**
     * Crea una nueva textura.
     * @param {string} src - La ruta de la imagen de la textura.
     */
    constructor(src) {
        super();
        this.image = new Image();
        this.image.src = src;
    }
}

/**
 * Clase que representa un sprite en el lienzo.
 * @extends Texture
 */
class Sprite extends Texture {
    /**
     * Crea un nuevo sprite.
     * @param {string} imageSrc - La ruta de la imagen del sprite.
     */
    constructor(imageSrc) {
        super(imageSrc);
        this.width = 0;
        this.height = 0;
        // Establecer el tamaño una vez que la imagen se haya cargado
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }

    /**
     * Rota el sprite por un cierto ángulo en radianes.
     * @param {number} rad - El ángulo de rotación en radianes.
     */
    rotate(rad) {
        this.rotation += rad;
    }

    /**
     * Dibuja el sprite en el lienzo.
     * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado 2D del lienzo.
     */
    _draw(ctx) {
      ctx.drawImage(this.image, -this.width * this.anchor.x, -this.height * this.anchor.y, this.width, this.height); // Dibujar la imagen
    }
}


// Exporta las clases
export { ColorRect, Texture, Sprite };
