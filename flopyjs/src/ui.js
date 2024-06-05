import { Node2D } from "./core.js";

class Label extends Node2D {
    constructor(text, font, color, size, width = 100, height = 20) {
        super();
        this.text = text;
        this.font = font;
        this.color = color;
        this.size = size
        this.rectWidth = width;
        this.rectHeight = height;
    }
    _draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${this.size}px ${this.font}`;
        ctx.fillText(this.text, 15, -10);

        ctx.restore();
    }
}

export { Label }