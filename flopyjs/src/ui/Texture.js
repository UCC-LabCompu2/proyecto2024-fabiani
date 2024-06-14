import { Node2D } from "../core/Node2D.js"

/**
 * Clase que representa una textura en el lienzo.
 * @extends Node2D
 */
export class Texture extends Node2D {
    /**
     * Crea una nueva textura.
     * @param {string} src - La ruta de la imagen de la textura.
     */
    constructor(src) {
        super();
        this.image = new Image();
        this.image.src = src;
    }

    static load(ruta, callback) {
        const texture = new Image();
        texture.onload = () => {
            callback(texture);
        };
        texture.src = ruta;
    }
}
