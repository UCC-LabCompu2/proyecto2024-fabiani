/**
 * Clase para gestionar la entrada del usuario a través del teclado.
 */
class Input {
    /**
     * Crea una nueva instancia de Input.
     */
    constructor() {
        /**
         * Mapeo de teclas personalizado para entradas de usuario.
         * @type {Object}
         */
        this.keyMap = {};

        /**
         * Estado actual de las teclas.
         * @type {Object}
         */
        this.keys = {};

        this.setListeners();
    }

    /**
     * Obtiene una instancia única de Input utilizando el patrón Singleton.
     * @returns {Input} La instancia única de Input.
     */
    static getInstance() {
        if (!Input.instance) {
            Input.instance = new Input();
        }
        return Input.instance;
    }

    /**
     * Establece los escuchadores de eventos para las teclas.
     * Los eventos de teclado se utilizan para actualizar el estado de las teclas.
     */
    setListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    /**
     * Establece una tecla como presionada.
     * @param {string} key - El código de la tecla que se presionó.
     */
    setPressed(key) {
        this.keys[key] = true;
    }

    /**
     * Establece una tecla como liberada.
     * @param {string} key - El código de la tecla que se liberó.
     */
    setReleased(key) {
        this.keys[key] = false;
    }

    /**
     * Obtiene el estado actual de todas las teclas.
     * @returns {Object} El estado actual de las teclas.
     */
    getKeys() {
        return this.keys;
    }

    /**
     * Establece el mapeo de teclas personalizado.
     * @param {Object} keyMap - El mapeo de teclas personalizado.
     */
    setKeyMap(keyMap) {
        this.keyMap = keyMap;
    }

    /**
     * Comprueba si una entrada de usuario está presionada.
     * @param {string} inputName - El nombre de la entrada de usuario a comprobar.
     * @returns {boolean} true si la entrada de usuario está presionada, de lo contrario false.
     */
    isPressed(inputName) {
        const keys = this.keyMap[inputName];
        if (!keys) {
            console.error(`No se encontró la entrada '${inputName}' en el mapa de entradas.`);
            return false;
        }
        return keys.some(key => !!this.keys[key]);
    }
}

// Exporta una instancia única de Input utilizando el patrón Singleton.
export default Input.getInstance();
