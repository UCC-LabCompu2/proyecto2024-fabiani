/** Class representing a 2D vector. */
export class Vec {
    /**
     * Create a 2D vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * Set the coordinates of the vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {Vec} - The modified vector.
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Clone the vector.
     * @returns {Vec} - A new vector with the same coordinates.
     */
    clone() {
        return new Vec(this.x, this.y);
    }

    /**
     * Add another vector to this vector.
     * @param {Vec} v - The vector to add.
     * @returns {Vec} - The modified vector.
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Subtract another vector from this vector.
     * @param {Vec} v - The vector to subtract.
     * @returns {Vec} - The modified vector.
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Multiply this vector by a scalar value.
     * @param {number} scalar - The scalar value.
     * @returns {Vec} - The modified vector.
     */
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divide this vector by a scalar value.
     * @param {number} scalar - The scalar value.
     * @returns {Vec} - The modified vector.
     */
    div(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    /**
     * Get the length of the vector.
     * @returns {number} - The length of the vector.
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Get the angle of the vector.
     * @returns {number} - The angle of the vector in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Clamp the vector between minimum and maximum values.
     * @param {number} minX - The minimum x value.
     * @param {number} minY - The minimum y value.
     * @param {number} maxX - The maximum x value.
     * @param {number} maxY - The maximum y value.
     */
    clamp(minX, minY, maxX, maxY) {
        this.x = Math.min(Math.max(this.x, minX), maxX);
        this.y = Math.min(Math.max(this.y, minY), maxY);
    }

    /**
     * Normalize the vector (make its length 1).
     * @returns {Vec} - The modified vector.
     */
    normalize() {
        let mag = this.length();
        if (mag !== 0) {
            this.div(mag);
        }
        return this;
    }

    /**
     * Add two vectors.
     * @param {Vec} v1 - The first vector.
     * @param {Vec} v2 - The second vector.
     * @returns {Vec} - A new vector representing the sum.
     */
    static add(v1, v2) {
        return new Vec(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtract one vector from another.
     * @param {Vec} v1 - The first vector.
     * @param {Vec} v2 - The second vector.
     * @returns {Vec} - A new vector representing the difference.
     */
    static sub(v1, v2) {
        return new Vec(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Multiply a vector by a scalar value.
     * @param {Vec} v - The vector.
     * @param {number} scalar - The scalar value.
     * @returns {Vec} - A new vector representing the product.
     */
    static mult(v, scalar) {
        return new Vec(v.x * scalar, v.y * scalar);
    }

    /**
     * Divide a vector by a scalar value.
     * @param {Vec} v - The vector.
     * @param {number} scalar - The scalar value.
     * @returns {Vec} - A new vector representing the quotient.
     */
    static div(v, scalar) {
        if (scalar !== 0) {
            return new Vec(v.x / scalar, v.y / scalar);
        } else {
            return new Vec();
        }
    }

    /** Get a vector with both components set to zero. */
    static get ZERO() {
        return new Vec(0, 0);
    }

    /** Get a vector with both components set to one. */
    static get ONE() {
        return new Vec(1, 1);
    }

    /** Get a vector pointing up (positive y direction). */
    static get UP() {
        return new Vec(0, -1);
    }

    /** Get a vector pointing down (negative y direction). */
    static get DOWN() {
        return new Vec(0, 1);
    }

    /** Get a vector pointing left (negative x direction). */
    static get LEFT() {
        return new Vec(-1, 0);
    }

    /** Get a vector pointing right (positive x direction). */
    static get RIGHT() {
        return new Vec(1, 0);
    }
}
