
/**
 * Clase base para objetos 
 */
export class Node {
    /**
     * Crea un nuevo objeto.
     */
    constructor() {
        this.name = "";
        this.children = [];
        this.childCount = 0;
        this.isOnTree = false;
        this.isReady = false;
        this.paused = true; // Despausado inicialmente
        this.parent = null; // Hasta que se añada al arbol con addChild
    }

    /**
     * Obtiene un hijo por su índice.
     * @param {number} index - El índice del hijo.
     * @returns {Node} El hijo correspondiente al índice especificado.
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
        return this.children.find(child => child.name === name);
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

    _getPathArray() {
        let path = [];
        let node = this;
        while (node.parent) {
            path.push(node);
            node = node.parent;
        }
        return path.reverse();
    }

    getPath() {
        let strPath = "./";
        let path = this._getPathArray();
        path.forEach(node => {
            strPath += node.name + "/";
        });
        strPath = strPath.slice(0, -1);
        return strPath;
    }

    $(path) {
        let pathArray = path.slice(2).split("/");
        let node = this;
        pathArray.forEach(name => {
            if (!node) {
                throw new Error(`Node not found: ${path}`);
            }
            node = node.getChildByName(name);
        });
        return node;
    }
    /**
     * Agrega un hijo.
     * @param {Object} child - El hijo a agregar.
     */
    addChild(child) {
        this.children[this.childCount] = child;
        child.setParent(this);
        if (this.isOnTree) child._enterTree();
        if (this.isReady) child._ready();
        this.childCount++;
    }

    addTo(parent) {
        parent.addChild(this);
        return this;
    }

    _init() {
        this.paused = false;
        this.children.forEach(child => {
            child._init();
        });
    }

    _ready() {
        this.isReady = true;
        this.children.forEach(child => child._ready());
    }

    _update(delta) {
        if (this.paused) return;
        this.children.forEach(child => child._update(delta));
    }

    _enterTree() {
        this.isOnTree = true;
        // select default name
        if (this.name == "") this.name = this._defaultName();
        this.children.forEach(child => child._enterTree());
    }

    _defaultName() {
        if (!this.parent) return "root"; // Es el Viewport principal instanciado por SceneTree
        let name = this.constructor.name;
        let k = 0;
        this.parent.children.forEach(child => {
            if (child.name == (name + k)) {
                k++;
            }
        });
        name += k;
        return name;
    }
    /**
     * Elimina un hijo por su índice.
     * @param {number} index - El índice del hijo a eliminar.
     */
    removeChild(index) {
        delete this.children[index];
        child.setParent(null);
        child.isOnTree = false;
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