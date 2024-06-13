import { Color, ColorRect, $, Label, createGame, Vector2D, Camera } from "./flopyjs/main.js";
import Player from "./js/player.js";

// Inicializando el juego
const screen = $("#screen");
const game = createGame(screen.object);


// Creando el jugador
const player = new Player();
const camera = new Camera();

player.position.set(200, 200);
console.log(player)
player.addChild(camera);

game.root.setCamera(camera)
game.addChild(player);

// Creando un bloque blanco
const block = new ColorRect(Color.white, new Vector2D(50, 50));
block.position.set(100, 100);
game.addChild(block);

const block2 = new ColorRect(Color.red, new Vector2D(200, 200));
block2.position.set(300, 300);
game.addChild(block2);
game.root.moveChild(2, 0); // lo mueve detras para que se renderice antes

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
