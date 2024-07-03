import { Node2D } from './Node2D.js';
import PhysicsEngine from './PhysicsEngine.js';
import {HitBox} from './HitBox.js';
import { Vector2D } from '../utils/Vector2D.js';

export class KinematicBody2D extends Node2D {
    constructor() {
        super();
        this.velocity = new Vector2D();
        this.hitbox = null;
    }

    addChild(child) {
        super.addChild(child);
        if (child instanceof HitBox) {
            this.hitbox = child;
        }
    }

    moveAndSlide(velocity) {
        
        if (!this.hitbox || !PhysicsEngine) return;
        
        PhysicsEngine.colliders.forEach(element => {
            if (this.hitbox == element) return;
            this.hitbox.collideWithVelocity(element, velocity);
        });
        
        this.position.add(velocity);
    }
}
