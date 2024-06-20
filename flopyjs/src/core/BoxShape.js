import { Shape } from './Shape.js';

export class BoxShape extends Shape {
    constructor(size) {
        super();
        this.size = size;
    }

    intersects(otherShapePosition, otherShape, newPosition) {
        if (otherShape instanceof BoxShape) {
            // Check intersection using AABB (Axis-Aligned Bounding Box) method
            let left1 = newPosition.x - this.size.x / 2;
            let right1 = newPosition.x + this.size.x / 2;
            let top1 = newPosition.y - this.size.y / 2;
            let bottom1 = newPosition.y + this.size.y / 2;

            let left2 = otherShapePosition.x - otherShape.size.x / 2;
            let right2 = otherShapePosition.x + otherShape.size.x / 2;
            let top2 = otherShapePosition.y - otherShape.size.y / 2;
            let bottom2 = otherShapePosition.y + otherShape.size.y / 2;
            console.log(otherShapePosition, newPosition)
            return !(right1 < left2 || 
                     right2 < left1 || 
                     bottom1 < top2 || 
                     bottom2 < top1);
        }
        return false;
    }

    _draw(ctx) {
        ctx.fillStyle = "#0088ff88";
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }
}
