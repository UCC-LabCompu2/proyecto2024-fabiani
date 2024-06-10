import { SceneTree, Object, Node2D, createGame } from './src/core.js';
import { Vector2D } from './src/vector.js'
import { ColorRect, Texture, Sprite } from './src/canvas.js';
import Input from './src/input.js';
import { clamp } from './src/utils.js'
import { $ } from './src/dom.js';
import { Label } from './src/ui.js'

// Exportar todas las clases y utilidades
export { Label, $, createGame, clamp, Vector2D, SceneTree, Object, ColorRect, Texture, Sprite, Input, Node2D};
