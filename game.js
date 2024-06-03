import { createGame, Vector2 } from "./flopyjs/main.js"
import Player from "./js/player.js"

let canvas = document.getElementById( 'viewport' )
console.log(canvas)
let game = createGame(canvas)

let player = new Player()

player.position = new Vector2(200, 200)

game.root.setBackgoundColor("#237845")
game.root.appendChild(player)
game.run()