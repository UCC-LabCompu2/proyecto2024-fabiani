import { Label, createGame, Vector2, Sprite, Input } from "./flopyjs/main.js"
import Player from "./js/player.js"

let canvas = document.getElementById( 'viewport' )
let game = createGame(canvas)

let player = new Player()

player.position = new Vector2(200, 200)

game.root.setBackgoundColor("#234845")
game.root.appendChild(player)

game.run();

let fps = new Label("FPS: 0", "Pixelify Sans", "white", 16, 100, 50, 200, 20)
game.root.appendChild(fps)
window.setInterval( () => {
    fps.text = "FPS: " + game.fps
})

let startButton = document.getElementById( 'start');
let menu = document.getElementById( 'menu');

startButton.addEventListener( 'click', startGame)

function startGame() {
    menu.classList.add('hidden');
    let playerName = document.getElementById( 'name').value;
    player.getChild(1).text = playerName;

    startButton.value = "Continue";
    document.getElementById('title').innerHTML = "Pause";
}

//Pause
let isPaused = false;
document.addEventListener( 'keydown', (e) => {
    if (e.key == "p") pause()
})
document.getElementById('pause').addEventListener( 'click', pause)

function pause() {
    if (isPaused) {
        menu.classList.add('hidden');
    } else {
        menu.classList.remove('hidden');
    }
    isPaused = !isPaused;
}

