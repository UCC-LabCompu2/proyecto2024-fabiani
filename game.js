import * as G from "./gameengine/main.js"

let entities = []
G.config.screen = { width: window.screen.width,
                    height: window.screen.height
                }

let screen = G.config.screen
let canvas = document.createElement('canvas')
canvas.width = screen.width
canvas.height = screen.height
document.body.appendChild(canvas)
let ctx = canvas.getContext('2d')
let lastTime = 0

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime
    lastTime = timestamp


    update(deltaTime)
    render(ctx)

    requestAnimationFrame(gameLoop)
}

function update(timestamp) {
    entities.forEach(entity => entity.update(timestamp))

    entities.forEach(entity => {
        entities.forEach(other => {
            if (entity !== other && detectCollision(entity, other)) {
                console.log('Collision detected!');
            }
        })
    })
    
}

function render(ctx) {
    ctx.clearRect(0, 0, screen.width, screen.height)
    entities.forEach(entity => entity.render(ctx))
}

requestAnimationFrame(gameLoop)


let player = new G.Player(100, 100, 50, 50)
player.position = new G.Vector2D(100, 100)
entities.push(player)

function detectCollision(entity1, entity2) {
    return entity1.x < entity2.x + entity2.width &&
           entity1.x + entity1.width > entity2.x &&
           entity1.y < entity2.y + entity2.height &&
           entity1.y + entity1.height > entity2.y;
}

