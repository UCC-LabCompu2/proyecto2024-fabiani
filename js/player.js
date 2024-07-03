import { Texture, BoxShape, CollisionShape, KinematicBody2D, Label, Node2D, Vector2D, AnimatedSprite, Input} from "../flopyjs/main.js";
import HitBox from "../flopyjs/src/core/HitBox.js";
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
        Texture.load("./assets/images/red-shroom-idle.png", (image) => {
            this.spr = new AnimatedSprite(image, 32, 32, 2, 0.002);
            this.spr.name = "spr";
            this.addChild(this.spr)
        });
        
        let nameLabel = new Label(this.playerName, "Pixelify Sans", "white", 18);
        nameLabel.pivot.set(0.5, 0.5);
        nameLabel.name = "nameLabel";
        nameLabel.posX = 0;
        nameLabel.posY = -40;
        this.addChild(nameLabel);
        this.nameLabel = nameLabel;
        const col = new HitBox(0, 0, 32, 32);
        this.addChild(col);
        this.lastColPos;
        this.col = col;
    }

    _update(delta) {
        super._update(delta);
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
        // Rotar segun la velocidad
        // if (!this.velocity.isEquals(0, 0)) this.spr.rotation = this.velocity.angle() + Math.PI * (3 / 2);
        this.moveAndSlide(this.velocity);
        // Evita que se salga de los bordes del Viewport.size
        // this.position.clamp(0, 0, this.getRoot().size.x, this.getRoot().size.y);
    }

    input_move(vel) {
        this.moveAndSlide(vel.mult(this.speed));
    }
}

// Export the classes
export { Player };
export default Player
