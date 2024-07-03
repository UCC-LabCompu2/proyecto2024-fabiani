import { TileMap, HitBox, CollisionShape, SceneTree, Sprite, Texture, Color, ColorRect, $, Label, Vector2D, Camera2D, Input, BoxShape } from "./flopyjs/main.js";
import Player from "./js/player.js";

// Configurando
const screen = $("#screen");
const game = new SceneTree(screen.object);

// Creando el jugador
const player = new Player();
player.position.set(200, 200);
game.addChild(player);

// Creando la camara que siga al jugador
const camera = new Camera2D(true);
game.addChild(camera);
camera.follow(player);
camera.active = true;
camera.zoom = 2;

// Activar o desactivar la camara
Input.onKeyPressed("c", () => camera.toggleActive())


// Creando el tilemap del terreno
async function loadTileMap(filePath) {
    const response = await fetch(filePath);
    const data = await response.json();
    return data;
}

// const tilesetData = {
//     "tileWidth": 32,
//     "tileHeight": 32,
//     "tilesPerRow": 3,
//     "tilesetImage": "assets/images/level.png",
//     "layers": [
//       {
//         "name": "background",
//         "data": [
//             [1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1]
//         ]
//       },
//       {
//         "name": "collision",
//         "data": [
//           [2, 2, 2, 2, 2],
//           [2, 0, 0, 0, 2],
//           [2, 0, 0, 0, 2],
//           [2, 0, 0, 0, 2],
//           [2, 2, 2, 2, 2]
//         ]
//       }
//     ]
//   }
  

// // loadTileMap('./level.json').then(tileMapData => {
//     const tileMap = new TileMap(tilesetData);
//     tileMap.addCollisions();

//     // Integrar el tileMap con el juego
//     game.root.addChild(tileMap);
//     console.log(game);
// // });

// Creando una colision
const col1 = new HitBox(0, 0, 100, 100);
game.addChild(col1);

Texture.load("./assets/images/grass.jpg", tex => {
    game.backgroundTexture = tex
})

try {
    console.log(game.root.$("./player/Camera"));
} catch(error) {
    console.log(error.message);
}


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
    console.log(player.getPath())
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
