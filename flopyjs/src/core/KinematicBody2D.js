import { Node2D } from './Node2D.js';
import PhysicsEngine from './PhysicsEngine.js';
import { CollisionShape } from './CollisionShape.js';

export class KinematicBody2D extends Node2D {
    constructor() {
        super();
        this.velocity = { x: 0, y: 0 };
        this.collisionShape = null;
    }

    setCollisionShape(shape) {
        this.collisionShape = shape;
    }

    moveAndSlide(velocity) {
        let newPosition = this.getGlobalPosition().add(velocity);

        if (this.collisionShape) {
            let colliding = false;

            // Check collisions with all other colliders
            for (let collider of PhysicsEngine.colliders) {
                if (collider !== this.collisionShape && collider.collide(this.collisionShape, newPosition)) {
                    colliding = true;
                    break;
                }
            }

            // Move only if no collision detected
            if (!colliding) {
                this.position.add(velocity)
            }
        } else {
            // Move without collision check if no collision shape is set
            this.position.add(velocity)
        }
    }

    addChild(child) {
        super.addChild(child);
        if (child instanceof CollisionShape) {
            this.setCollisionShape(child);
        }
    }
}
