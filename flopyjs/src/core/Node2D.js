import { Node } from "./Node.js";
import { Vector2D } from "../utils/Vector2D.js";

export class Node2D extends Node {
    constructor() {
        super();
        this.position = Vector2D.ZERO;
        this.rotation = 0; // Rotación en radianes
        this.scale = Vector2D.ONE;
        this.anchor = new Vector2D(0.5, 0.5); // Centro del nodo
        this.visible = true;

        this._init();
    }

    _draw(ctx) {
        return
    }

    render(ctx) {
        if (!this.visible) return;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale.x, this.scale.y);
        
        this._draw(ctx) // Se dibuja a si mismo el Nodo2D 
        // Este metodo lo pueden heredar los renderizables

        // Renderizar hijos
        this.children.forEach(child => {
            child.render(ctx);
        });

        ctx.restore();
    }

    getGlobalPosition() {
        let position = this.position.clone();
        let node = this;
        while (node.parent) {
            node = node.parent;
            position = position.add(node.position);
        }
        return position;
    }
}
