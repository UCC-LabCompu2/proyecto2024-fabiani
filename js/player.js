import { Collision, KinematicBody2D, Label, Node2D, Vector2D, Sprite, Input} from "../flopyjs/main.js";
import { Joystick } from "./joystick.js"

// Agrega otras teclas como entrada
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
class Player extends KinematicBody2D  {
    constructor() {
        super();
        this.position = new Vector2D();
        this.joystick = new Joystick('joystick-container')
        this.speed = 0.5;
        this.size = new Vector2D(32, 32);
        this.playerName = "";
        this.velocity = new Vector2D();
        // Crea y añade como hijo una imagen al jugador para que se renderice
        let spr = new Sprite("./assets/sprites/player.png");
        spr.name = "spr";
        spr.anchor.set(0.5, 0.5);
        this.addChild(spr)
        this.spr = spr;
        let nameLabel = new Label(this.playerName, "Pixelify Sans", "white", 18);
        nameLabel.anchor.set(0.5, 0.5);
        nameLabel.name = "nameLabel";
        nameLabel.posX = 0;
        nameLabel.posY = -40;
        this.addChild(nameLabel);
        this.nameLabel = nameLabel;
        const col = new Collision(new Vector2D(32, 32));
        col.position = new Vector2D(-16, -16);
        this.addChild(col);
        this.lastColPos;
        this.col = col;

    }

    _update(delta) {
        super._update();
        // Movimiento del jugador
        this.velocity.x = Input.isPressed('right') - Input.isPressed('left');
        this.velocity.y = Input.isPressed('down') - Input.isPressed('up');
        if (this.joystick.dragging) {
            this.velocity.x = this.joystick.relativeX
            this.velocity.y = this.joystick.relativeY
        } else {
            this.velocity.normalize()
        }
        

        this.velocity.mult(this.speed * delta);
        if (!this.velocity.isEquals(0, 0)) {
            this.spr.rotation = this.velocity.angle() + Math.PI * (3 / 2);
        }
        this.slide(this.velocity);
        // Evita que se salga de los bordes del Viewport.size
        // this.position.clamp(0, 0, this.getRoot().size.x, this.getRoot().size.y);
    }

    input_move(vel) {
        this.slide(vel.mult(this.speed));
    }
}

// Export the classes
export { Player };
export default Player
