import { Node2D } from "../core/Node2D.js"
import { Color } from "../utils/Color.js"
import { Vector2D } from "../utils/Vector2D.js"

/**
 * Clase que representa un rectángulo coloreado en el lienzo.
 * @extends Node2D
 */
export class ColorRect extends Node2D {
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