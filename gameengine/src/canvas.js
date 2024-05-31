import { Vector2D, Object } from './core.js';

class ColorRect extends Object {
    constructor(color, x, y, width, height) {
        super();
        this.position = new Vector2D(x, y);
        this.size = new Vector2D(width, height);
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}

class Texture extends Object {
    constructor(src) {
        super();
        this.image = new Image();
        this.image.src = src;
    }
}

class Sprite {
    constructor(imageSrc, x = 0, y = 0) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = new Vector2D(x, y);
        this.width = 0;
        this.height = 0;
        this.rotation = 0; // Rotación en radianes

        // Establecer el tamaño una vez que la imagen se haya cargado
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }

    rotate(rad) {
        this.rotation += rad;
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2); // Trasladar al centro del sprite
        ctx.rotate(this.rotation); // Rotar el contexto
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // Dibujar la imagen
        ctx.restore(); // Restaurar el contexto a su estado original
    }
}

// Export the classes
export { ColorRect, Texture, Sprite};
