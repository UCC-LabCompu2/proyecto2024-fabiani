
import { Vec } from "./vector.js";

class Transform {
    constructor(x, y) {
        this.position = new Vec(x, y);
        this.rotation = 0;
        this.scale = new Vec(1, 1);
        this.parent = null
    }
}

class Object {
    constructor() {
        this.name = "";
        this.childs = [];
        this.childCount = 0;
        this.parent = null;
    }

    getChild(index) {
        return this.childs[index];
    }

    getChildByName(name) {
        return this.childs[name];
    }

    getChildCount() {
        return this.childCount;
    }

    getChildren() {
        return this.childs;
    }

    getParent() {
        return this.parent;
    }

    setParent(parent) {
        this.parent = parent;
    }
    
    appendChild(child) {
        this.childs[this.childCount] = child;
        child.setParent(this);
        this.childCount++;
    }

    removeChild(index) {
        delete this.childs[index];
        child.setParent(null);
        this.childCount--;
    }

    removeChildByName(name) {
        let child = this.getChildByName(name);
        delete this.childs[name];
        child.setParent(null);
        this.childCount--;
    }

    getTree() {
        let main = this;
        while (main.parent != null) {
            main = main.parent;
        }
        return main;
    }

    findNodes(className) {
        let nodes = [];
        this._findNodes(className, nodes)
        return nodes
    }

    _findNodes(className, nodes) {
        this.childs.forEach(node => {
            if (node instanceof className) {
                nodes.push(node);
            }
            node._findNodes(className, nodes);
        });
    }
}


class Node extends Object {
    constructor() {
        super();
        this.position = Vec.ZERO;
        this.globalPosition = Vec.ZERO;
        this.rotation = 0; // Rotación en radianes
        this.scale = Vec.ONE
        this.anchor = Vec.ONE
        this.processMode = 0
        this.visible = true;
        this._init()
    }

    setPosition(x , y) {
        this.position = new Vec(x, y);
        this.childs.forEach(child => {
            child.globalPosition = child.position.add(this.globalPosition);
        })
    }

    _init() {
        this.processMode = 1;
        this.childs.forEach(child => {
            child._init();
        });
    }

    _process(delta) {
        if (this.processMode == 0) return
        this.childs.forEach(child => {
            child._process(delta);
        });
    }

    _draw(ctx) {
        if (!this.visible) return
        ctx.save()
        ctx.translate(this.position.x, this.position.y);

        this.childs.forEach(child => {
            child._draw(ctx);
        });
        ctx.restore()
    }
}


class MainLoop {
    constructor() {

    }
}

export class Viewport extends Node {
    constructor(canvas) {
        super()
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.backgroundColor = "white";
    }

    setBackgoundColor(color) {
        this.backgroundColor = color
    }

    _render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.childs.forEach(child => {
            child._draw(this.ctx);
        });
    }
}


/**
 * Crea el arbol de escena
 * @param {canvas} canvasSrc 
 * @returns {SceneTree} Arbol de escena
 */
export function createGame(canvasSrc) {
    return new SceneTree(canvasSrc);
}

class SceneTree extends Node {
    constructor(canvas) {
        super()
        let root = new Viewport(canvas)
        this.appendChild(root)
        this.root = root
        this.lastTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.fps = 60;
    }

    fincNodes(className) {
        this.root.fincNodes(className);
    }

    run() {
        requestAnimationFrame(this.gameLoop)
    }

    
    gameLoop(timestamp) {
        let delta = timestamp - this.lastTime
        this.lastTime = timestamp

        if (delta > 1000 / this.fps) delta = 1000 / this.fps

        this.root._process(delta);
        this.root._render();

        requestAnimationFrame(this.gameLoop)
    }
}

export { 
    Object,
    Node as Node2D, 
    MainLoop,
}