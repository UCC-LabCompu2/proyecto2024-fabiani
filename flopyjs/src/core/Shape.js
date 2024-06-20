import { Vector2D } from "../utils/Vector2D.js";
import { Node2D } from "./Node2D.js";

export class Shape {
    constructor() {
        this.position = Vector2D.ZERO;
        this.rotation = 0;
    }

    intersects(shape) {
        throw new Error("intersects() debe ser implementado en subclases");
    }

    _draw(ctx) {
        throw new Error("_draw method not implemented");
    }

    getRotationMatrix() {
        let cos = Math.cos(this.rotation);
        let sin = Math.sin(this.rotation);
        return [
            [cos, -sin],
            [sin, cos]
        ];
    }
}
