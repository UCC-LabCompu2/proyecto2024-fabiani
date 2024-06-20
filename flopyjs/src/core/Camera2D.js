import { Node2D } from "./Node2D.js";
import { Vector2D } from "../utils/Vector2D.js";

export class Camera2D extends Node2D {
    constructor(active = false, zoom = 1) {
        super();
        this.zoom = 1;
        this.active = active;
        this.deadZone = new Vector2D(40, 40); // Tamaño del margen
        this.following = null;
        this.smoothFactor = 0.1;
    }

    follow(node) {
        this.following = node;
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    _draw(ctx) {
        super._draw(ctx);
        this.drawDeadZone(ctx);
    }

    drawDeadZone(ctx) {
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(-this.deadZone.x, -this.deadZone.y);
        ctx.lineTo(this.deadZone.x, -this.deadZone.y);
        ctx.lineTo(this.deadZone.x, this.deadZone.y);
        ctx.lineTo(-this.deadZone.x, this.deadZone.y);
        ctx.lineTo(-this.deadZone.x, -this.deadZone.y);
        ctx.stroke();
    }

    _update() {
        if (this.following) {
            let globalPosition = this.getGlobalPosition();
            let targetPosition = this.following.getGlobalPosition();

            let dx = targetPosition.x - globalPosition.x;
            let dy = targetPosition.y - globalPosition.y;

            // Dead zone move
            if (Math.abs(dx) > this.deadZone.x) {
                this.position.x += dx - Math.sign(dx) * this.deadZone.x;
            }

            if (Math.abs(dy) > this.deadZone.y) {
                this.position.y += dy - Math.sign(dy) * this.deadZone.y;
            }

            // Smooth move
            // this.position.lerp(this.following.position, this.smoothFactor)
        }
    }
    
    _enterTree() {
        super._enterTree();
        if (this.active) this.getRoot().setCamera(this);
    }

    toggleActive() {
        if (!this.isOnTree) return;
        this.active = !this.active;
        this.getRoot().setCamera(this.active ? this : null);
    }
}
