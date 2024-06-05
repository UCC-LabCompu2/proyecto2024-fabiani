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

class Query {
    constructor(object) {
        this.object = object;
    }
    on(event, callback) {
        this.object.addEventListener(event, callback)
        return this
    }

}

function $(selector) {
    return new Query(document.querySelector(selector));
}

function setAsKey(element, key) {
    element
    .on('mousedown', () => {
        Input.setPressed(key)
    })
    .on('mouseup', () => Input.setReleased(key));    
}

function startGame() {
    menu.classList.add('hidden');
    let playerName = document.getElementById( 'name').value;
    player.getChild(1).text = playerName;
}

setAsKey($("#leftArrow"), 'ArrowLeft');
setAsKey($("#rightArrow"), 'ArrowRight');
setAsKey($("#upArrow"), 'ArrowUp');
setAsKey($("#downArrow"), 'ArrowDown');

