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


    render(ctx) {
        if (this.camera) {
            ctx.save();
            // Camara
            const camPos = this.camera.getGlobalPosition();
            const offset = camPos.invert().add(this.size.clone().div(2))
            //ctx.scale(this.camera.zoom, this.camera.zoom)
            ctx.translate(offset.x, offset.y);
            super.render(ctx);
            ctx.restore();
        } else {
            super.render(ctx);
        }
    }
}

