import { Node2D } from './Node2D.js';
import { Vector2D } from '../utils/Vector2D.js';
import PhysicsEngine from './PhysicsEngine.js';
import { CollisionShape } from './CollisionShape.js';

export class PhysicBody extends Node2D {
    constructor() {
        super();
        this.collisionShape = null;
    }

    addChild(child) {
        super.addChild(child);
        if (child instanceof CollisionShape) {
            this.setCollisionShape(child);
        }
    }

    setCollisionShape(collisionShape) {
        this.collisionShape = collisionShape;
    }

    move(velocity) {
        if (!this.collisionShape) return;
        let newPosition = this.position.clone().add(velocity);
        const collision = this.checkCollisions(newPosition);
        if (!collision) {
            this.position.add(velocity);
        } else {
            const slideVelocity = this.slide(velocity, collision.normal);
            this.position.add(slideVelocity);
        }
    }

    checkCollisions(newPosition) {
        this.collisionShape.shape.position = newPosition;
        for (let collider of PhysicsEngine.colliders) {
            if (collider !== this.collisionShape) {
                const collision = collider.shape.intersects(this.collisionShape.shape);
                return collision;
            }
        }
        return null;
    }

    slide(velocity, normal) {
        const dotProduct = velocity.dot(normal);
        return velocity.sub(normal.mult(dotProduct));
    }
}
