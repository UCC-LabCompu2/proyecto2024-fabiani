import { Node2D, Vector2, Sprite, Input, CONFIG } from "../flopyjs/main.js";

// Configura el mapa de entradas
Input.setKeyMap(CONFIG.inputMap);

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

let relativeX = 0
let relativeY = 0
let dragging = false

document.addEventListener('DOMContentLoaded', (event) => {
    const joystickContainer = document.getElementById('joystickContainer');
    const joystick = document.getElementById('joystick');

    dragging = false;
    let startX, startY, currentX, currentY;
    const centerX = joystickContainer.offsetWidth / 2;
    const centerY = joystickContainer.offsetHeight / 2;

    joystick.addEventListener('touchdown', (e) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('touchmove', (e) => {
        if (dragging) {
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;

            const distance = Math.sqrt(currentX ** 2 + currentY ** 2);
            const maxDistance = joystickContainer.offsetWidth / 2 - joystick.offsetWidth / 2;

            if (distance > maxDistance) {
                const angle = Math.atan2(currentY, currentX);
                currentX = Math.cos(angle) * maxDistance;
                currentY = Math.sin(angle) * maxDistance;
            }

            joystick.style.transform = `translate(${currentX}px, ${currentY}px)`;

            relativeX = currentX / maxDistance;
            relativeY = currentY / maxDistance;
        }
    });

    document.addEventListener('touchup', () => {
        if (dragging) {
            dragging = false;
            joystick.style.transform = 'translate(0px, 0px)';
        }
    });
});

// Player class
class Player extends Node2D  {
    constructor() {
        super();
        this.speed = 0.5;
        this.playerName = "";
        let spr = new Sprite("./assets/sprites/player.png");
        spr.name = "spr";
        spr.anchor.set(0.5, 0.5);
        this.appendChild(spr)
        let nameLabel = new Label(this.playerName, "Pixelify Sans", "white", 18);
        nameLabel.anchor.set(0.5, 0.5);
        nameLabel.name = "nameLabel";
        this.appendChild(nameLabel)
        console.log(this)
    }

    _process(delta) {
        // Movimiento del jugador
        let vel = new Vector2();
        vel.x = Input.isPressed('right') - Input.isPressed('left');
        vel.y = Input.isPressed('down') - Input.isPressed('up');
        if (dragging) {
            vel.x = relativeX
            vel.y = relativeY
        }
        
        vel.normalize();
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
