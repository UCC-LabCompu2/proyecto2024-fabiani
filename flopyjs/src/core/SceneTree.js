import { Viewport } from "./Viewport.js";

/**
 * Clase que representa el árbol de escena que manejara el bucle principal
 */
export class SceneTree {
    /**
     * Crea un nuevo árbol de escena.
     * @param {HTMLCanvasElement} canvas - El elemento canvas del viewport.
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.root = new Viewport();
        this.root._enterTree();
        this.lastTime = 0;
        this.fps = 60;
        this._mainLoop = this._mainLoop.bind(this);
    }

    /**
     * Encuentra nodos de una clase específica en el árbol de escena.
     * @param {Object} className - La clase de los nodos a encontrar.
     */
    findNodes(className) {
        this.root.findNodes(className);
    }

    addChild(node) {
        this.root.addChild(node);
        node._enterTree();
        return node;
    }

    removeChild(node) {
        this.root.removeChild(node);
    }

    /**
     * Ejecuta el bucle de juego.
     */
    run() {
        this.root._ready();
        requestAnimationFrame(this._mainLoop);
    }

    update(delta) {
        this.root._update(delta);
    }

    render(ctx) {
        this.ctx.fillStyle = "#242343";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.root.render(ctx);
    }

    /**
     * Método del bucle de juego.
     * @param {number} timestamp - La marca de tiempo del fotograma actual.
     */
    _mainLoop(timestamp) {
        let delta = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (delta > 1000 / this.fps) delta = 1000 / this.fps;

        this.update(delta);
        this.render(this.ctx);

        requestAnimationFrame(this._mainLoop);
    }

    /**
     * Establece el estado de pausa del juego.
     * @param {boolean} value - true para pausar el juego, false para reanudarlo.
     */
    set pause(value) {
        if (value) {
            cancelAnimationFrame(this._mainLoop);
            this.root.paused = true;
        } else {
            this.run();
            this.root.paused = false;
        }
    }
}
