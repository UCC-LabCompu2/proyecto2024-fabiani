import { Node2D } from "./Node2D.js";
import { Vector2D } from "../utils/Vector2D.js";
import { Color } from "../utils/Color.js";

export class Viewport extends Node2D {
    constructor() {
        super();
        this.size = new Vector2D(400, 400);
        this.camera = null;
        this.backgroundColor = Color.GRAY;
        this.backgroundTexture = null;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    setBackgroundTexture(texture) {
        this.backgroundTexture = texture;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    _draw(ctx) {
        if (this.backgroundTexture) {
            ctx.fillStyle = ctx.createPattern(this.backgroundTexture, 'repeat');
            ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

        } else {
            // Si no hay textura de fondo, utiliza el color de fondo
            ctx.fillStyle = this.backgroundColor.toString();
            ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        }
    }

    render(ctx) {
        if (this.camera) {
            ctx.save();
            // Camara
            const offset = this.camera.getGlobalPosition();
            ctx.translate(-offset.x + this.size.x / 2, -offset.y + this.size.y / 2);
            super.render(ctx);
            ctx.restore();
        } else {
            super.render(ctx);
        }
    }
}

