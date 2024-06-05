import { Node2D } from "./core.js";
import { Vec } from "./vector.js";

/**
 * Label para dibujar texto en pantalla
 * @param text Texto a dibujar
 * @param font Fuente del texto
 * @param color Color del texto
 * @param size Tamaño del texto
 * @param width Ancho del rectángulo del texto
 * @param height Alto del rectángulo del texto
 * @param posX Posición X del texto
 * @param posY Posición Y del texto
 */
class Label extends Node2D {
    /**
     * 
     * @param {string} text 
     * @param {string} font 
     * @param {string} color 
     * @param {number} size 
     * @param {number} width 
     * @param {number} height 
     * @param {number} posX 
     * @param {number} posY 
     */
    constructor(text, font, color, size, width = 100, height = 20, posX = 0, posY = 0) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.text = text;
        this.font = font;
        this.color = color;
        this.size = size
        this.rectWidth = width;
        this.rectHeight = height;
    }
    _draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${this.size}px ${this.font}`;
        ctx.fillText(this.text, this.posX, this.posY);
        ctx.restore();
    }
}

export { Label }