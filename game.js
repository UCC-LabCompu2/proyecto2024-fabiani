import { Sprite, Texture, Color, ColorRect, $, Label, createGame, Vector2D, Camera, Input } from "./flopyjs/main.js";
import Player from "./js/player.js";

// Inicializando el juego
const screen = $("#screen");
const game = createGame(screen.object);

// Creando el jugador
const player = new Player();
player.name = "player";
const camera = new Camera(true);
camera.name = "Camera"
Input.onKeyPressed("c", () => camera.toggleActive())

player.position.set(200, 200);
player.addChild(camera);

const meme = new Sprite("./assets/images/meme.jpg")
.addTo(game)    
.position.add(100, 100);

Texture.load("./assets/images/grass.jpg", tex => {
    game.root.setBackgroundTexture(tex)
})

game.addChild(player);

console.log(game.root.$("./player/Camera"))

// Creando un bloque blanco
const block = new ColorRect(Color.BLACK, new Vector2D(50, 50));
block.position.set(100, 100)
game.root.addChild(block);

const block2 = new ColorRect(Color.RED, new Vector2D(200, 200));
block2.position.set(300, 300);
game.addChild(block2);

// Detalle de los fps
let fps = new Label("FPS: 0", "Pixelify Sans", "white", 16, 100, 50, 200, 20);
game.addChild(fps);

window.setInterval(() => {
    fps.text = "FPS: " + game.fps;
}, 1000);

// Interactividad del menu
let startButton = $('#start');
let menu = $('#menu');
let name = $('#name');

startButton.on('click', startGame);

function startGame() {
    if (name.value === "") {
        name.addClass("error");
        return;
    }

    game.run();
    console.log(game)
    game.pause = false;
    name.removeClass("error");
    menu.hide();
    player.getChild(1).text = name.value;

    startButton.value = "Continue";
    $("#title").html = "Pause";
}

$('#pause').on('click', () => {
    menu.show();
    game.pause = true;
});
