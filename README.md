# Flopy Engine
Un simple motor de videojuegos creado desde cero con vanilla javascript

- [Conceptos basicos](#conceptos-basicos)
- [Comenzado](#comenzado)
  - [Crear un jugador](#crear-un-jugador)
- [Archivos](#archivos)
- [Licencia](#licencia)
- [Contacto](#contacto)

[LINK PARA JUGAR](https://lucasfabiani.netlify.app/)

## Conceptos basicos
El motor esta diseñado al estilo de los motores como Godot y Unity que utilizan un árbol de escena **SceneTree** al que se le van agregando nodos. Estos nodos son customizables y heredan la clase **Node** (Fíjese en `player.js`).

- **SceneTree**: Maneja el bucle principal, renderizado y actualizacion de hijos. Nada que no esté en el SceneTree se va a renderizar
- **Node**: Clase básica a la que hereda cualquier objeto 2D que quieras crear
- **Vec**: Vector 2D con el que se maneja muchos de los objetos en el juego
- **Viewport**: Contiene el canva y su context 2D con el que se crea el juego
- **Input**: Se encarga de manejar eventos


## Comenzado
1. Copia a tu carpeta la carpeta `./flopyjs`
2. Comencemos con la base html. Crea un archivo `index.html`
```html
<html>
    <body>
        <canvas id="viewport" width="800" height="600"></canvas>
    </body>
    <script src="game.js"></script>
<html>
```

3. En `game.js` 
```js
import { createGame } from './flopyjs/main.js' 

let canvas = document.getElementById( 'viewport' )
let game = createGame(canvas) // Crea el juego y devuelve el SceneTree

game.run() // Inicia el bucle principal del juego
```

### Crear un jugador
En un archivo externo o en el mismo codigo principal
```js
import { Node2D, Sprite } from "./flopyjs/main.js";

// Player class
class Player extends Node2D  {
    constructor() {
        super();
        // Crea y añade como hijo una imagen al jugador para que se renderice
        let spr = new Sprite("./path/to/image.png");
        this.appendChild(spr)
    }

    _process(delta) {
        // Movimiento del jugador, se llama cada frame
        this.position.x++ // de dezplaza a la derecha
    }
}

let player = new Player()
game.appendChild(player) // agrega el jugador al juego
```


## Archivos
- `canvas.js`: Contiene todo lo referido a dibujo en el canvas 
- `core.js`: Contiene lo central del juego: Object, - Node, SceneTree, Viewport, etc
- `dom.js`: En desarrollo pero, parecido a JQuery, intenta facilitar el uso de elementos HTML *(EN DESARROLLO)*
- `input.js`: Contiene la clase Input *(EN DESARROLLO)*
- `physics.js`: Physics y el sub-motor que maneja las colisiones *(EN DESARROLLO)*
- `ui.js`: Tiene Label para dibujar en el viewport
- `utils.js`: Algunas funciones varias
- `vector.js`: Contiene la clase Vec

## Licencia
El motor de es de carácter público y uso libre según MIT licence

## Contacto
Para alguna colaboración, encargo, trabajo o más contactame al gmail oficial [lucasefabiani@gmail.com](https://mail.google.com/mail)