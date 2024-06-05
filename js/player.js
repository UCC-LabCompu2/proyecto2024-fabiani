import { Label, Node2D, Vector2, Sprite, Input } from "../flopyjs/main.js";
import { Joystick } from "./joystick.js"

const CONFIG = {
    inputMap: {
        left: ["ArrowLeft", "KeyA"],
        right: ["ArrowRight", "KeyD"],
        up: ["ArrowUp", "KeyW"],
        down: ["ArrowDown", "KeyS"]
    }
};

// Configura el mapa de entradas
Input.setKeyMap(CONFIG.inputMap);

/**
 * Clase Player que hereda Node2D
 * @extends Node2D
 */
class Player extends Node2D  {
    constructor() {
        super();
        this.joystick = new Joystick('joystick-container')
        this.speed = 0.5;
        this.playerName = "";
        let spr = new Sprite("./assets/sprites/player.png");
        spr.name = "spr";
        spr.anchor.set(0.5, 0.5);
        this.appendChild(spr)
        let nameLabel = new Label(this.playerName, "Pixelify Sans", "white", 18);
        nameLabel.anchor.set(0.5, 0.5);
        nameLabel.name = "nameLabel";
        nameLabel.posX = 15
        nameLabel.posY = -10
        this.appendChild(nameLabel)
        console.log(this)
    }

    _process(delta) {
        // Movimiento del jugador
        let vel = new Vector2();
        vel.x = Input.isPressed('right') - Input.isPressed('left');
        vel.y = Input.isPressed('down') - Input.isPressed('up');
        if (this.joystick.dragging) {
            vel.x = this.joystick.relativeX
            vel.y = this.joystick.relativeY
        } else {
            vel.normalize()
        }
        

        vel.mult(this.speed * delta);
        if (vel.x != 0 || vel.y != 0) this.getChild(0).rotation = vel.angle() + Math.PI * (3 / 2);
        this.move(vel);
        this.position.clamp(0, 0, this.getTree().root.width - this.getChild(0).width, this.getTree().root.height - this.getChild(0).height);
    }

    input_move(vel) {
        this.move(vel.mult(this.speed));
    }

    move(vel) {
        this.position.x += vel.x;
        this.position.y += vel.y;
    }
}

// Export the classes
export { Player };
export default Player
