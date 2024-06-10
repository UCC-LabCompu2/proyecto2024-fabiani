import { Vector2D } from "./vector.js";

/**
 * Clase base para objetos 
 */
export class Object {
    /**
     * Crea un nuevo objeto.
     */
    constructor() {
        this.name = "";
        this.childs = [];
        this.childCount = 0;
        this.parent = null;
    }

    /**
     * Obtiene un hijo por su índice.
     * @param {number} index - El índice del hijo.
     * @returns {Object} El hijo correspondiente al índice especificado.
     */
    getChild(index) {
        return this.childs[index];
    }

    /**
     * Obtiene un hijo por su nombre.
     * @param {string} name - El nombre del hijo.
     * @returns {Object} El hijo correspondiente al nombre especificado.
     */
    getChildByName(name) {
        return this.childs[name];
    }

    /**
     * Obtiene el número de hijos.
     * @returns {number} El número de hijos.
     */
    getChildCount() {
        return this.childCount;
    }

    /**
     * Obtiene todos los hijos.
     * @returns {Object[]} Un array con todos los hijos.
     */
    getChildren() {
        return this.childs;
    }

    /**
     * Obtiene el padre.
     * @returns {Object|null} El padre.
     */
    getParent() {
        return this.parent;
    }

    /**
     * Establece el padre.
     * @param {Object} parent - El padre.
     */
    setParent(parent) {
        this.parent = parent;
    }

    /**
     * Agrega un hijo.
     * @param {Object} child - El hijo a agregar.
     */
    appendChild(child) {
        this.childs[this.childCount] = child;
        child.setParent(this);
        this.childCount++;
    }

    /**
     * Elimina un hijo por su índice.
     * @param {number} index - El índice del hijo a eliminar.
     */
    removeChild(index) {
        delete this.childs[index];
        child.setParent(null);
        this.childCount--;
    }

    /**
     * Elimina un hijo por su nombre.
     * @param {string} name - El nombre del hijo a eliminar.
     */
    removeChildByName(name) {
        let child = this.getChildByName(name);
        delete this.childs[name];
        child.setParent(null);
        this.childCount--;
    }

    /**
     * Obtiene la raíz del árbol.
     * @returns {Object} La raíz del árbol.
     */
    getRoot() {
        let main = this;
        while (main.parent != null) {
            main = main.parent;
        }
        return main;
    }

    /**
     * Encuentra todos los nodos de una clase específica.
     * @param {Object} className - La clase de los nodos a encontrar.
     * @returns {Object[]} Un array con todos los nodos encontrados.
     */
    findNodes(className) {
        let nodes = [];
        this._findNodes(className, nodes)
        return nodes;
    }

    /**
     * Método interno para encontrar nodos de una clase específica.
     * @param {Object} className - La clase de los nodos a encontrar.
     * @param {Object[]} nodes - Un array para almacenar los nodos encontrados.
     */
    _findNodes(className, nodes) {
        this.childs.forEach(node => {
            if (node instanceof className) {
                nodes.push(node);
            }
            node._findNodes(className, nodes);
        });
    }
}

/**
 * Clase base para nodos renderizables
 */
export class Node2D extends Object {
    /**
     * Crea un nuevo nodo 2D.
     */
    constructor() {
        super();
        this.position = Vector2D.ZERO;
        this.globalPosition = Vector2D.ZERO;
        this.rotation = 0; // Rotación en radianes
        this.scale = Vector2D.ONE;
        this.anchor = Vector2D.ONE;
        this.processMode = 1; // despausa
        this.visible = true;
        this._init();
    }

    /**
     * Establece la posición del nodo.
     * @param {number} x - La coordenada x de la posición.
     * @param {number} y - La coordenada y de la posición.
     */
    setPosition(x, y) {
        this.position = new Vector2D(x, y);
        this.childs.forEach(child => {
            child.globalPosition = child.position.add(this.globalPosition);
        });
    }

    /**
     * Inicializa el nodo.
     */
    _init() {
        this.processMode = 1;
        this.childs.forEach(child => {
            child._init();
        });
    }

    /**
     * Procesa el nodo.
     * @param {number} delta - El delta de tiempo desde el último fotograma.
     */
    _process(delta) {
        if (this.processMode == 0) return;
        this.childs.forEach(child => {
            child._process(delta);
        });
    }

    /**
     * Dibuja el nodo.
     * @param {CanvasRenderingContext2D} ctx - El contexto de renderizado 2D del lienzo.
     */
    _draw(ctx) {
        if (!this.visible) return;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        this.childs.forEach(child => {
            child._draw(ctx);
        });
        ctx.restore();
    }
}

/**
 * Clase que representa el viewport (canva)
 */
export class Viewport extends Node2D {
    /**
     * Crea un nuevo viewport.
     * @param {HTMLCanvasElement} canvas - El elemento canvas del viewport.
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.backgroundColor = "white";
    }

    /**
     * Establece el color de fondo del viewport.
     * @param {string} color - El color de fondo.
     */
    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    /**
     * Renderiza el viewport.
     */
    _render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.childs.forEach(child => {
            child._draw(this.ctx);
        });
    }
}

/**
 * Crea el árbol de escena.
 * @param {HTMLCanvasElement} canvas - El elemento canvas del viewport.
 * @returns {SceneTree} El árbol de escena.
 */
export function createGame(canvas) {
    return new SceneTree(canvas);
}

/**
 * Clase que representa el árbol de escena que manejara el bucle principal
 */
export class SceneTree {
    /**
     * Crea un nuevo árbol de escena.
     * @param {HTMLCanvasElement} canvas - El elemento canvas del viewport.
     */
    constructor(canvas) {
        let root = new Viewport(canvas);
        console.log(this);
        this.root = root;
        this.lastTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.fps = 60;
    }

    /**
     * Encuentra nodos de una clase específica en el árbol de escena.
     * @param {Object} className - La clase de los nodos a encontrar.
     */
    findNodes(className) {
        this.root.findNodes(className);
    }

    /**
     * Ejecuta el bucle de juego.
     */
    run() {
        requestAnimationFrame(this.gameLoop);
    }

    /**
     * Método del bucle de juego.
     * @param {number} timestamp - La marca de tiempo del fotograma actual.
     */
    gameLoop(timestamp) {
        let delta = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (delta > 1000 / this.fps) delta = 1000 / this.fps;

        this.root._process(delta);
        this.root._render();

        requestAnimationFrame(this.gameLoop);
    }

    /**
     * Establece el estado de pausa del juego.
     * @param {boolean} value - true para pausar el juego, false para reanudarlo.
     */
    set pause(value) {
        if (value) {
            cancelAnimationFrame(this.gameLoop);
            this.root.processMode = 0;
        } else {
            this.run();
            this.root.processMode = 1;
        }
    }
}
