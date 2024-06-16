import { Vector2D } from "../utils/Vector2D.js";
import { Shape } from "./Shape.js";

export class BoxShape extends Shape {
    constructor(size) {
        super();
        this.size = size;
    }

    collide(shape) {
        if (shape instanceof BoxShape) {
            const globalPos = this.getGlobalPosition();
            const shapeGlobalPos = shape.getGlobalPosition();
            return  globalPos.x + this.size.x > shapeGlobalPos.x &&
                    globalPos.x < shapeGlobalPos.x + shape.size.x &&
                    globalPos.y + this.size.y > shapeGlobalPos.y &&
                    globalPos.y < shapeGlobalPos.y + shape.size.y;
        }
        return false;
    }

    _draw(ctx) {
        ctx.fillStyle = "#0088ff88";
        ctx.fillRect(0, 0, this.size.x, this.size.y);
    }
}