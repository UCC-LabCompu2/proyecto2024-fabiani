import { Shape } from "./Shape.js";
import { Vector2D } from "../utils/Vector2D.js";

export class CircleShape extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    intersects(shape) {
        if (shape instanceof CircleShape) {
            const dx = this.position.x - shape.position.x;
            const dy = this.position.y - shape.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.radius + shape.radius) {
                const overlap = this.radius + shape.radius - distance;
                const normal = new Vector2D(dx, dy).normalize();
                return {
                    normal: normal,
                    depth: overlap
                };
            }
        } else if (shape instanceof BoxShape) {
            // Implementar la intersección círculo-caja con rotación
        }
        return null;
    }

    _draw(ctx) {
        ctx.save();
        ctx.fillStyle = "#00ff0088";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
