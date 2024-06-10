import { Node2D } from './core.js';

/**
 * Clase que representa un rectángulo coloreado en el lienzo.
 * @extends Node2D
 */
class ColorRect extends Node2D {
    /**
     * Crea un nuevo rectángulo coloreado.
     * @param {string} color - El color del rectángulo en formato CSS.
     * @param {number} x - La coordenada x de la posición del rectángulo.
     * @param {number} y - La coordenada y de la posición del rectángulo.
     * @param {number} width - El ancho del rectángulo.
     * @param {number} height - La altura del rectángulo.
     */
    constructor(color, x, y, width, height) {
        super();
        this.size = new Vec(width, height);
        this.color = color;
    }

    /**
     * Dibuja el rectángulo coloreado en el lienzo.
     * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado 2D del lienzo.
     */
    _draw(ctx) {
        ctx.fillStyle = this.color;
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
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2); // Trasladar al centro del sprite
        ctx.rotate(this.rotation); // Rotar el contexto
        ctx.scale(this.scale.x, this.scale.y); // Escalar el contexto
        ctx.drawImage(this.image, -this.width * this.anchor.x, -this.height * this.anchor.y, this.width, this.height); // Dibujar la imagen
        ctx.restore(); // Restaurar el contexto a su estado original
    }
}

// Exporta las clases
export { ColorRect, Texture, Sprite };
