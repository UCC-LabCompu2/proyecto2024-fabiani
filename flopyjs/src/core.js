import { Vector2D } from "./vector.js";

let ok = ()=> console.log("ok");

/**
 * Clase base para objetos 
 */
export class Object {
    /**
     * Crea un nuevo objeto.
     */
    constructor() {
        this.name = "";
        this.children = [];
        this.childCount = 0;
        this.parent = null; // Hasta que se añada al arbol con addChild
    }

    /**
     * Obtiene un hijo por su índice.
     * @param {number} index - El índice del hijo.
     * @returns {Object} El hijo correspondiente al índice especificado.
     */
    getChild(index) {
        return this.children[index];
    }

    moveChild(from, to) {
        this.children.splice(to, 0, this.children[from]);
    }
    /**
     * Obtiene un hijo por su nombre.
     * @param {string} name - El nombre del hijo.
     * @returns {Object} El hijo correspondiente al nombre especificado.
     */
    getChildByName(name) {
        return this.children[name];
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
        return this.children;
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
    addChild(child) {
        this.children[this.childCount] = child;
        child.setParent(this);
        this.childCount++;
    }

    /**
     * Elimina un hijo por su índice.
     * @param {number} index - El índice del hijo a eliminar.
     */
    removeChild(index) {
        delete this.children[index];
        child.setParent(null);
        this.childCount--;
    }

    /**
     * Elimina un hijo por su nombre.
     * @param {string} name - El nombre del hijo a eliminar.
     */
    removeChildByName(name) {
        let child = this.getChildByName(name);
        delete this.children[name];
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
        this.children.forEach(node => {
            if (node instanceof className) {
                nodes.push(node);
            }
            node._findNodes(className, nodes);
        });
    }
}

export class Node2D extends Object {
    constructor() {
        super();
        this.position = Vector2D.ZERO;
        this.rotation = 0; // Rotación en radianes
        this.scale = Vector2D.ONE;
        this.anchor = new Vector2D(0.5, 0.5); // Centro del nodo

        this.paused = true; // Despausado inicialmente
        this.visible = true;

        this._init();
    }

    _init() {
        this.paused = false;
        this.children.forEach(child => {
            child._init();
        });
    }

    update(delta) {
        if (this.paused) return;
        this.children.forEach(child => child.update(delta));
    }

    _draw(ctx) {
        return
    }

    render(ctx) {
        if (!this.visible) return;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale.x, this.scale.y);
        
        this._draw(ctx) // Se dibuja a si mismo el Nodo2D 
        // Este metodo lo pueden heredar los renderizables

        // Renderizar hijos
        this.children.forEach(child => {
            child.render(ctx);
        });

        ctx.restore();
    }

    getGlobalPosition() {
        let position = this.position.clone();
        let node = this;
        while (node.parent) {
            node = node.parent;
            position = position.add(node.position);
        }
        return position;
    }
}


export class Viewport extends Node2D {
    constructor() {
        super();
        this.size = new Vector2D(400, 400);
        this.camera = null;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    _draw(ctx) {
        ctx.fillStyle = "#432956";
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    render(ctx) {
        if (this.camera) {
            ctx.save();
            // Camara
            const offset = this.camera.getGlobalPosition();
            ctx.translate(-offset.x + this.size.x / 2, -offset.y + this.size.y / 2);
            super.render(ctx);
            ctx.restore();
        } else {
            super.render(ctx);
        }
    }
}


export class Camera extends Node2D {
    constructor() {
        super();
        this.zoom = 1;
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    render(ctx) {
        ctx.save();
        ctx.scale(this.zoom, this.zoom);
        super.render(ctx);
        ctx.restore();
    }
}

export class Renderer {
    constructor() {
        if (!Renderer.instance) {
            Renderer.instance = this;
        }
        return Renderer.instance;
    }

    static getInstance() {
        if (!Renderer.instance) {
            throw new Error("Renderer not initialized. Call new Renderer() first.");
        }
        return Renderer.instance;
    }

    setViewport(viewport) {
        this.viewport = viewport;
    }

    setup(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(sceneTree) {
        this.clear();
        if (this.viewport && this.viewport.camera) {
            this.ctx.save();
            const camera = this.viewport.camera;
            const position = camera.getGlobalPosition();
           
            this.ctx.translate(-position.x + this.canvas.width / 2, -position.y + this.canvas.height / 2);
        }

        sceneTree.render(this.ctx);

        if (this.viewport && this.viewport.camera) {
            this.ctx.restore();
        }
    }
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
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.root = new Viewport();
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
    }

    removeChild(node) {
        this.root.removeChild(node);
    }

    /**
     * Ejecuta el bucle de juego.
     */
    run() {
        requestAnimationFrame(this._mainLoop);
    }

    update(delta) {
        this.root.update(delta);
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




const renderer = new Renderer();

/**
 * Crea el árbol de escena.
 * @param {HTMLCanvasElement} canvas - El elemento canvas del viewport.
 * @returns {SceneTree} El árbol de escena.
 */
export function createGame(canvas) {
    const scene = new SceneTree(canvas);
    return scene;
}