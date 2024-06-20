import { Node } from "./Node.js";
import { Vector2D } from "../utils/Vector2D.js";

export class Node2D extends Node {
    constructor() {
        super();
        this.position = Vector2D.ZERO;
        this.rotation = 0; // Rotación en radianes
        this.scale = Vector2D.ONE;
        this.pivot = Vector2D.ZERO; // Centro del nodo
        this.visible = true;

        this._init();
    }

    _draw(ctx) {
        ctx.strokeStyle = "white";
        this.drawCross(ctx);
        this.drawName(ctx);
        ctx.save();
        ctx.strokeStyle = "cyan";
        ctx.translate(this.pivot.x, this.pivot.y);
        this.drawCross(ctx);
        ctx.restore();
    }


    drawName(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText(this.name, 0, 15);
        ctx.fillText('('+this.constructor.name+')', 0, 25);
    }

    drawCross(ctx) {
        ctx.beginPath();
        ctx.moveTo(-5, 0);
        ctx.lineTo(5, 0);
        ctx.moveTo(0, -5);
        ctx.lineTo(0, 5);
        ctx.stroke();
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
