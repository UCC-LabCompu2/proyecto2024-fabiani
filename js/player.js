import { Node2D, Vector2, Sprite, Input, CONFIG } from "../flopyjs/main.js";

// Configura el mapa de entradas
Input.setKeyMap(CONFIG.inputMap);

// Player class
class Player extends Node2D {
    constructor() {
        super();
        this.speed = 0.5;
        let spr = new Sprite("../assets/sprites/player.png");
        spr.name = "spr";
        spr.anchor.set(0.5, 0.5);
        this.appendChild(spr)
    }

    _process(delta) {
        // Movimiento del jugador
        let vel = new Vector2();
        vel.x = Input.isPressed('right') - Input.isPressed('left');
        vel.y = Input.isPressed('down') - Input.isPressed('up');
        vel.normalize();
        vel.mult(this.speed * delta);
        if (vel.x != 0 || vel.y != 0) this.getChild(0).rotation = vel.angle() + Math.PI * (3 / 2);
        this.move(vel);
    }

    move(v) {
        this.position.x += v.x;
        this.position.y += v.y;
        this.position.clamp(0, 0, this.getTree().root.width - this.getChild(0).width, this.getTree().root.height - this.getChild(0).height);
    }
}

// Export the classes
export { Player };
export default Player