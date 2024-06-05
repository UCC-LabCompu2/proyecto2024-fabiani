export class HTMLElement {
    constructor(object) {
        this.object = object;
    }
    on(event, callback, parameters) {
        this.object.addEventListener(event, callback, parameters)
        return this
    }
}

export function $(selector) {
    return new HTMLElement(document.querySelector(selector));
}