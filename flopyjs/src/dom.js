/**
 * Clase que proporciona funcionalidades adicionales para manipular elementos del DOM.
 */
export class Query {
    /**
     * Crea una nueva instancia de Query.
     * @param {HTMLElement} object - El elemento del DOM al que se asociará esta instancia de Query.
     */
    constructor(object) {
        this.object = object;
    }

    /**
     * Agrega un manejador de eventos al elemento del DOM.
     * @param {string} event - El nombre del evento.
     * @param {Function} callback - La función de devolución de llamada que se llamará cuando ocurra el evento.
     * @param {Object} [parameters] - Parámetros adicionales a pasar a la función de devolución de llamada.
     * @returns {Query} Esta instancia de Query para permitir el encadenamiento de métodos.
     */
    on(event, callback, parameters) {
        this.object.addEventListener(event, callback, parameters);
        return this;
    }

    /**
     * Oculta el elemento del DOM al agregar la clase 'hidden'.
     */
    hide() {
        this.object.classList.add('hidden');
    }

    /**
     * Muestra el elemento del DOM al eliminar la clase 'hidden'.
     */
    show() {
        this.object.classList.remove('hidden');
    }

    /**
     * Obtiene el valor del elemento del DOM.
     * @returns {string} El valor del elemento del DOM.
     */
    get value() {
        return this.object.value;
    }

    /**
     * Establece el valor del elemento del DOM.
     * @param {string} value - El valor para establecer en el elemento del DOM.
     */
    set value(value) {
        this.object.value = value;
    }

    /**
     * Obtiene el contenido HTML del elemento del DOM.
     * @returns {string} El contenido HTML del elemento del DOM.
     */
    get html() {
        return this.object.innerHTML;
    }

    /**
     * Establece el contenido HTML del elemento del DOM.
     * @param {string} value - El contenido HTML para establecer en el elemento del DOM.
     */
    set html(value) {
        this.object.innerHTML = value;
    }

    /**
     * Verifica si el elemento del DOM está visible.
     * @returns {boolean} true si el elemento está visible, false si está oculto.
     */
    get visible() {
        return !this.object.classList.contains('hidden');
    }

    /**
     * Establece la visibilidad del elemento del DOM.
     * @param {boolean} value - true para mostrar el elemento, false para ocultarlo.
     */
    set visible(value) {
        if (value) this.show();
        else this.hide();
    }

    /**
     * Agrega una clase al elemento del DOM.
     * @param {string} className - El nombre de la clase a agregar.
     */
    addClass(className) {
        this.object.classList.add(className);
    }

    /**
     * Elimina una clase del elemento del DOM.
     * @param {string} className - El nombre de la clase a eliminar.
     */
    removeClass(className) {
        this.object.classList.remove(className);
    }
}

/**
 * Función de utilidad para seleccionar un elemento del DOM.
 * @param {string} selector - El selector CSS para el elemento a seleccionar.
 * @returns {Query} Una instancia de Query que representa el elemento seleccionado.
 */
export function $(selector) {
    return new Query(document.querySelector(selector));
}
