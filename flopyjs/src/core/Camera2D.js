import { Node2D } from "./Node2D.js";

export class Camera2D extends Node2D {
    constructor(active = false, zoom = 1) {
        super();
        this.zoom = 1;
        this.active = active;
    }

    setZoom(zoom) {
        this.zoom = zoom;
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
