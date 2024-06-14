import { Texture } from "./Texture.js"

/**
 * Clase que representa un sprite en el lienzo.
 * @extends Texture
 */
export class Sprite extends Texture {
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
