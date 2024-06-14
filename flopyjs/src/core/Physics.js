import { Node2D, Shape2D} from "./core.js";


class PhysicsEngine {
    constructor() {
        this.colliders = [];

        if (PhysicsEngine.instance) {
            return PhysicsEngine.instance;
        }
        PhysicsEngine.instance = this;
    }

    addCollider(collider) {
        this.colliders.push(collider);
    }

    removeCollider(collider) {
        this.colliders.splice(this.colliders.indexOf(collider), 1);
    }

    update() {
        if (this.colliders.length == 0) return
        if (this.colliders.length == 1) return
        this.colliders.forEach(collider => {
            this.colliders.forEach(other => {
                if (collider == other) return
                if (other.collide(collider)) {
                    other.isColliding = true;
                    collider.isColliding = true;
                }
            })
        })
    }
}

PhysicsEngine = new PhysicsEngine()

class Shape {
    constructor() {

    }
    collide() {
        return false
    }
}

class Box {
    constructor(x, y, width, height) {
        this.x
        this.y
        this.width
        this.height
    }

    collide(other) {
        return this.collideWithBox(other);
    }
    
    collideWithBox(position, other, otherPosition) {
        const xcol = Math.abs(position.x - otherPosition.x) <= (other.extensions.x + this.extensions.x);
        const ycol = Math.abs(position.y - otherPosition.y) <= (other.extensions.y + this.extensions.y);
        return xcol && ycol;
    }
    _draw(ctx) {
        ctx.translate(position.x, position.y)
        ctx.fillRect()
    }
}

export class CollisionShape2D extends Node2D {
    constructor(shape) {
        super();
        this.shape = shape;
    }

    setShape(shape) {
        this.shape = shape;
    }

    collide(other) {
        console.log(other.shape)
        this.isColliding = this.shape.collide(this.position, other.shape, other.position);
        return this.isColliding
    }

    _draw(ctx) {
        if (!this.visible) return
        ctx.save()
        ctx.translate(this.position.x, this.position.y);
        ctx.fillStyle = "#0000ff80"
        ctx.fillRect(-this.shape.size.x / 2, -this.shape.size.y / 2, this.shape.size.x / 2, this.shape.size.y / 2)
        ctx.restore()
    }
}

export class PhysicBody2D extends Node2D{
    constructor() {
        super()
        this.collision = null
    }

    appendChild(child) {
        super.appendChild(child)
        if (child instanceof  CollisionShape2D) {
            this.collision = child;
        }
    }

    removeChild(child) {
        super.removeChild(child)
        if (child instanceof  CollisionShape2D) {
            this.collision = null;
        }
    }

    collide(other) {
        if (this.collision == null) return false
        return this.collision.collide(other)
    }

    move_and_collide(direction) {
        if (this.collide(direction)) return
        this.position.add(direction)
    }
}



export class RectangleShape2D extends Shape2D {
    constructor(size) {
        super();
        this.isColliding = false;
        this.size = size;
        this.anchor.set(0.5, 0.5);
    }

    collide(xform, other, otherXform) {
        console.log(other)
        this.isColliding = this.collideWithRectangle(xform, other, otherXform);
        return this.isColliding
        
    }

    collideWithRectangle(offset1, rect, offset) {
        console.log(rect)
        return this.position.x + offset1.x < rect.position.x + offset.x + rect.size.x &&
               this.position.x + this.size.x + offset1.x > rect.position.x + offset.x&&
               this.position.y + offset1.y < rect.position.y + offset.y + rect.size.y &&
               this.position.y + this.size.y + offset1.y > rect.position.y + offset.y;
    }
}
