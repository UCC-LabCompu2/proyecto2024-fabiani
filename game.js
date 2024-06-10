import { $, Label, createGame, Vector2D } from "./flopyjs/main.js"
import Player from "./js/player.js"

// Inicializando el juego
let canvas = $('#viewport');
let game = createGame(canvas.object);

// Creando el jugador
let player = new Player();

player.position = new Vector2D(200, 200);

game.root.setBackgoundColor("#234845");
game.root.appendChild(player);


// Detalle de los fps
let fps = new Label("FPS: 0", "Pixelify Sans", "white", 16, 100, 50, 200, 20);
game.root.appendChild(fps);

window.setInterval(() => {
    fps.text = "FPS: " + game.fps;
})

// Interactividad del menu
let startButton = $('#start');
let menu = $('#menu');
let name = $('#name');

startButton.on('click', startGame);

function startGame() {
    if (name.value == "") {
        name.addClass("error");
        return;
    }

    game.run();
    game.pause = false
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
