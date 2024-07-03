import { Node2D } from './Node2D.js';
import PhysicsEngine from './PhysicsEngine.js';

export class CollisionShape extends Node2D {
    constructor(shape) {
        super();
        this.shape = shape;
    }

    _enterTree() {
        PhysicsEngine.addCollider(this);
    }

    _exitTree() {
        PhysicsEngine.removeCollider(this);
    }


    collide(other) {
        this.shape.position = this.getGlobalPosition();
        other.shape.position = other.getGlobalPosition();
        return other.shape.intersects(this.shape)
    }

    _draw(ctx) {
        if (this.shape) this.shape._draw(ctx);
        super._draw(ctx);
    }
}
