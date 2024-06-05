class Input {
    static ARROW_LEFT = 'ArrowLeft';
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
    setPressed(key) {
        this.keys[key] = true;
    }
    setReleased(key) {
        this.keys[key] = false;
    }
    getKeys() {
        return this.keys;
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