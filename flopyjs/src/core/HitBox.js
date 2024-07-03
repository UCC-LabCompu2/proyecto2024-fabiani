import { Node2D } from "./Node2D.js";
import PhysicsEngine from "./PhysicsEngine.js";

export class HitBox extends Node2D {
    constructor(x, y, width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    _enterTree() {
        if (!PhysicsEngine) return;
        PhysicsEngine.colliders.push(this);
    }

    _exitTree() {
        if (!PhysicsEngine) return;
        PhysicsEngine.colliders = PhysicsEngine.colliders.filter(c => c !== this);
    }

    collide(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }

    collideWithVelocity(other, velocity) {
        let futurePos = this.getGlobalPosition().clone().add(velocity);
        let otherPos = other.getGlobalPosition();

        if (futurePos.x < otherPos.x + other.width &&
            futurePos.x + this.width > otherPos.x &&
            futurePos.y < otherPos.y + other.height &&
            futurePos.y + this.height > otherPos.y) {

            let overlapX = (futurePos.x + this.width / 2) - (otherPos.x + other.width / 2);
            let overlapY = (futurePos.y + this.height / 2) - (otherPos.y + other.height / 2);

            if (Math.abs(overlapX) > Math.abs(overlapY)) {
                velocity.x = 0;
            } else {
                velocity.y = 0;
            }
        }

        return velocity;
    }

    _draw(ctx) {
        ctx.fillStyle = "#00558888";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default HitBox
