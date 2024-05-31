class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    clamp(min, max) {
        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);
    }

    clamp(minX, minY, maxX, maxY) {
        this.x = Math.min(Math.max(this.x, minX), maxX);
        this.y = Math.min(Math.max(this.y, minY), maxY);
    }

    normalize() {
        let mag = this.length();
        if (mag !== 0) {
            this.div(mag);
        }
        return this;
    }

    static add(v1, v2) {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }

    static multiply(v, scalar) {
        return new Vector2D(v.x * scalar, v.y * scalar);
    }

    static divide(v, scalar) {
        if (scalar !== 0) {
            return new Vector2D(v.x / scalar, v.y / scalar);
        } else {
            return new Vector2D();
        }
    }
}

class Object {
    constructor() {
        this.name = "";
        this.childs = {};
    }

    appendChild(child) {
        this.childs[child.name] = child;
    }

    removeChild(child) {
        delete this.childs[child.name];
    }
}

class Entity extends Object {
    constructor() {
        super();
        this.position = new Vector2D(0, 0);
    }

    update(deltaTime) {
        // Lógica de actualización específica de la entidad
    }

    render(ctx) {
        // Renderiza la entidad en el contexto de canvas
    }
}

export { Entity, Object, Vector2D }