import { Object, Node2D, createGame } from './src/core.js';
import { Vector2 } from './src/vector2.js'
import { ColorRect, Texture, Sprite } from './src/canvas.js';
import Input from './src/input.js';
import CONFIG from "./src/config.js"
import { clamp } from './src/utils.js'


// Exportar todas las clases y utilidades
export { createGame, clamp, CONFIG, Vector2, Object, ColorRect, Texture, Sprite, Input, Node2D};
