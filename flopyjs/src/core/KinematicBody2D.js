import { Node2D } from "./Node2D.js";
import { Vector2D } from "../utils/Vector2D.js";
import PhysicsEngine from "./PhysicsEngine.js";

export class KinematicBody2D extends Node2D {

    _update(deltaTime) {
        super._update(deltaTime);
    }

    slide(vel) {
        let newPosition = this.position.clone().add(vel);
        if (!this.checkCollisions(newPosition)) {
            this.position.add(vel);
        } else {
            // Movimiento en X
            newPosition = this.position.clone().add(new Vector2D(vel.x, 0));
            if (!this.checkCollisions(newPosition)) {
                this.position.add(new Vector2D(vel.x, 0));
            }

            // Movimiento en Y
            newPosition = this.position.clone().add(new Vector2D(0, vel.y));
            if (!this.checkCollisions(newPosition)) {
                this.position.add(new Vector2D(0, vel.y));
            }
        }
    }

    checkCollisions(newPosition) {
        this.lastColPos = this.position.clone();
        this.position = newPosition;
        for (let collider of PhysicsEngine.colliders) {
            if (collider !== this.col && collider.collide(this.col)) {
                this.position = this.lastColPos;
                return true;
            }
        }
        this.position = this.lastColPos;
        return false;
    }
}