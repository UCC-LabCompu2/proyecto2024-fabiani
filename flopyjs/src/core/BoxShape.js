import { Shape } from './Shape.js';
import { Vector2D } from '../utils/Vector2D.js';

export class BoxShape extends Shape {
    constructor(size) {
        super();
        this.size = size;
    }

    intersects(shape) {
        if (shape instanceof BoxShape) {
            const dx = this.position.x - shape.position.x;
            const dy = this.position.y - shape.position.y;
            const intersectX = Math.abs(dx) < (this.size.x / 2 + shape.size.x / 2);
            const intersectY = Math.abs(dy) < (this.size.y / 2 + shape.size.y / 2);

            if (intersectX && intersectY) {
                const overlapX = this.size.x / 2 + shape.size.x / 2 - Math.abs(dx);
                const overlapY = this.size.y / 2 + shape.size.y / 2 - Math.abs(dy);

                if (overlapX < overlapY) {
                    return {
                        normal: new Vector2D(Math.sign(dx), 0),
                        overlap: overlapX
                    };
                } else {
                    return {
                        normal: new Vector2D(0, Math.sign(dy)),
                        overlap: overlapY
                    };
                }
            }
        }
        return null;
    }

    _draw(ctx) {
        ctx.fillStyle = "#0088ff88";
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }
}
