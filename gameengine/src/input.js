class Input {
    constructor() {
        this.keyMap = {}
        this.keys = {};
        this.setListeners()
    }
    static getInstance() {
        if (!Input.instance) {
            Input.instance = new Input();
        }
        return Input.instance;
    }
    setListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }
    getKeys() {
        return this.keys;
    }
    isPressed(key) {
        return !!this.keys[key];
    }
    setKeyMap(keyMap) {
        this.keyMap = keyMap;
    }

    isPressed(inputName) {
        const keys = this.keyMap[inputName];
        if (!keys) {
            console.error(`No se encontró la entrada '${inputName}' en el mapa de entradas.`);
            return false;
        }
        return keys.some(key => !!this.keys[key]);
    }
}

export default Input.getInstance()