/** Class representing a 2D vector. */
export class Vector2D {
    /**
     * Create a 2D vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }
    
    invert() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * Set the coordinates of the vector.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {Vector2D} - The modified vector.
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Clone the vector.
     * @returns {Vector2D} - A new vector with the same coordinates.
     */
    clone() {
        return new Vector2D(this.x, this.y);
    }

    /**
     * Add another vector to this vector.
     * @param {Vector2D} v - The vector to add.
     * @returns {Vector2D} - The modified vector.
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Subtract another vector from this vector.
     * @param {Vector2D} v - The vector to subtract.
     * @returns {Vector2D} - The modified vector.
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Multiply this vector by a scalar value.
     * @param {number} scalar - The scalar value.
     * @returns {Vector2D} - The modified vector.
     */
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divide this vector by a scalar value.
     * @param {number} scalar - The scalar value.
     * @returns {Vector2D} - The modified vector.
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

    lerp(target, t) {
        this.x += (target.x - this.x) * t;
        this.y += (target.y - this.y) * t;
        return this;
    }

    /**
     * Get the angle of the vector.
     * @returns {number} - The angle of the vector in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Check if two vectors are equal.
     * @param {Vector2D} vector - The vector to compare.
     * @returns {boolean} - True if the vectors are equal, false otherwise.
     */
    isEquals(vector) {
        return this.x == vector.x && this.y == vector.y
    }

    /**
     * Check if coordinates are equal.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {boolean} - True if the vectors are equal, false otherwise.
     */
    isEquals(x, y) {
        return this.x == x && this.y == y
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
     * @returns {Vector2D} - The modified vector.
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
     * @param {Vector2D} v1 - The first vector.
     * @param {Vector2D} v2 - The second vector.
     * @returns {Vector2D} - A new vector representing the sum.
     */
    /** Get a vector with both components set to zero. */
    static get ZERO() {
        return new Vector2D(0, 0);
    }

    /** Get a vector with both components set to one. */
    static get ONE() {
        return new Vector2D(1, 1);
    }

    /** Get a vector pointing up (positive y direction). */
    static get UP() {
        return new Vector2D(0, -1);
    }

    /** Get a vector pointing down (negative y direction). */
    static get DOWN() {
        return new Vector2D(0, 1);
    }

    /** Get a vector pointing left (negative x direction). */
    static get LEFT() {
        return new Vector2D(-1, 0);
    }

    /** Get a vector pointing right (positive x direction). */
    static get RIGHT() {
        return new Vector2D(1, 0);
    }
}
