import { createGame, Vector2, Sprite, Input } from "./flopyjs/main.js"
import Player from "./js/player.js"

let canvas = document.getElementById( 'viewport' )
let game = createGame(canvas)

let player = new Player()

player.position = new Vector2(200, 200)

game.root.setBackgoundColor("#234845")
game.root.appendChild(player)

game.run();

let startButton = document.getElementById( 'start');
let menu = document.getElementById( 'menu');

startButton.addEventListener( 'click', startGame)

function startGame() {
    menu.classList.add('hidden');
    let playerName = document.getElementById( 'name').value;
    player.getChild(1).text = playerName;
}
