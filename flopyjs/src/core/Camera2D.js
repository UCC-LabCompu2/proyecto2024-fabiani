import { Node2D } from "./Node2D.js";
import { Vector2D } from "../utils/Vector2D.js";

export class Camera2D extends Node2D {
    constructor(active = false, zoom = 1) {
        super();
        this.zoom = 1;
        this.active = active;
        this.deadZone = new Vector2D(60, 60); // Tamaño del margen
        this.following = null;
    }

    follow(node) {
        this.following = node;
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    _update() {
        if (this.following) {
            let globalPosition = this.getGlobalPosition();
            let targetPosition = this.following.getGlobalPosition();

            let dx = targetPosition.x - globalPosition.x;
            let dy = targetPosition.y - globalPosition.y;

            if (Math.abs(dx) > this.deadZone.x) {
                this.position.x += dx - Math.sign(dx) * this.deadZone.x;
            }

            if (Math.abs(dy) > this.deadZone.y) {
                this.position.y += dy - Math.sign(dy) * this.deadZone.y;
            }
        }
    }

    render(ctx) {
        ctx.save();
        ctx.scale(this.zoom, this.zoom);
        super.render(ctx);
        ctx.restore();
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
