import { Vector2D, Entity } from "./core.js";
import { Sprite } from "./canvas.js";
import Input from "./input.js";
import config from "./config.js"

// Configuración del mapa de entradas
const inputMap = {
    up: ['ArrowUp', 'w'],
    down: ['ArrowDown', 's'],
    left: ['ArrowLeft', 'a'],
    right: ['ArrowRight', 'd']
};

// Configura el mapa de entradas
Input.setKeyMap(inputMap);

// Player class
class Player extends Entity {
    constructor(x, y, width, height) {
        super();
        this.position = new Vector2D(x, y);
        this.speed = 0.5;
        this.spr = new Sprite("player.png");
    }

    update(delta) {
        // Movimiento del jugador
        let vel = new Vector2D();
        vel.x = Input.isPressed('right') - Input.isPressed('left');
        vel.y = Input.isPressed('down') - Input.isPressed('up');
        vel.normalize();
        vel.mult(this.speed * delta);
        if (vel.x != 0 || vel.y != 0) this.spr.rotation = vel.angle() + Math.PI * (3 / 2);
        this.move(vel);
    }

    move(v) {
        this.position.x += v.x;
        this.position.y += v.y;
        this.spr.position = this.position;
        this.position.clamp(0, 0, config.screen.width - this.spr.width, config.screen.height - this.spr.height);
    }

    render(ctx) {
        this.spr.render(ctx);
    }
}

// Export the classes
export { Player };