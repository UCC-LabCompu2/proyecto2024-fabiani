import { Object, Node2D, createGame } from './src/core.js';
import { Vector2 } from './src/vector2.js'
import { ColorRect, Texture, Sprite } from './src/canvas.js';
import Input from './src/input.js';
import { clamp } from './src/utils.js'
import { HTMLElement, $ } from './src/dom.js';
import { Label } from './src/ui.js'

// Exportar todas las clases y utilidades
export { Label, HTMLElement, $, createGame, clamp, Vector2, Object, ColorRect, Texture, Sprite, Input, Node2D};
