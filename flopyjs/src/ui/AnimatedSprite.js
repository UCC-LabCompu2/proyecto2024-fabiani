import { Node2D } from "../core/Node2D.js";

export class AnimatedSprite extends Node2D {
    constructor(image, frameWidth, frameHeight, frameCount, framRate) {
        super();
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameRate = framRate;
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    _update(deltaTime) {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= 1 / this.frameRate) {
            this.elapsedTime = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }
    }

    _draw(ctx) {
        const frameX = this.currentFrame * this.frameWidth;
        const frameY = 0;
        ctx.drawImage(this.image,
            frameX, frameY, this.frameWidth, this.frameHeight,
            this.position.x - this.anchor.x, this.position.y - this.anchor.y, this.frameWidth, this.frameHeight);
    }
}