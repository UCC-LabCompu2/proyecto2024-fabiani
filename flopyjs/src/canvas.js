import { Node2D } from './core.js';
import { Vector2 } from './vector2.js';


class ColorRect extends Node2D {
    constructor(color, x, y, width, height) {
        super();
        this.size = new Vector2(width, height);
        this.color = color;
    }

    _draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class Texture extends Node2D {
    constructor(src) {
        super();
        this.image = new Image();
        this.image.src = src;
    }
}

class Sprite extends Texture {
    constructor(imageSrc) {
        super(imageSrc)
        this.width = 0;
        this.height = 0;
        // Establecer el tamaño una vez que la imagen se haya cargado
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }

    rotate(rad) {
        this.rotation += rad;
    }


    _draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2); // Trasladar al centro del sprite
        ctx.rotate(this.rotation); // Rotar el contexto
        ctx.scale(this.scale.x, this.scale.y); // Escalar el contexto
        ctx.drawImage(this.image, -this.width * this.anchor.x, -this.height * this.anchor.y, this.width, this.height); // Dibujar la imagen
        ctx.restore(); // Restaurar el contexto a su estado original
        
    }
}

// Export the classes
export { ColorRect, Texture, Sprite};
