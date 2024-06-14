/**
 * Devuelve un valor restringido dentro de un rango específico.
 * @param {number} x - El valor a restringir.
 * @param {number} min - El límite inferior del rango.
 * @param {number} max - El límite superior del rango.
 * @returns {number} El valor restringido dentro del rango especificado.
 */
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}

/**
 * Interpola linealmente entre dos valores.
 * @param {number} a - El valor inicial.
 * @param {number} b - El valor final.
 * @param {number} t - El factor de interpolación (entre 0 y 1).
 * @returns {number} El valor interpolado.
 */
function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * Mapea un valor de un rango a otro.
 * @param {number} x - El valor a mapear.
 * @param {number} in_min - El valor mínimo del rango de entrada.
 * @param {number} in_max - El valor máximo del rango de entrada.
 * @param {number} out_min - El valor mínimo del rango de salida.
 * @param {number} out_max - El valor máximo del rango de salida.
 * @returns {number} El valor mapeado al nuevo rango.
 */
function map(x, in_min, in_max, out_min, out_max) {
    return lerp(out_min, out_max, (x - in_min) / (in_max - in_min));
}

/**
 * Interpola suavemente entre dos valores utilizando la función smoothstep.
 * @param {number} a - El valor inicial.
 * @param {number} b - El valor final.
 * @param {number} x - El factor de interpolación (entre 0 y 1).
 * @returns {number} El valor interpolado suavemente.
 */
function smoothstep(a, b, x) {
    return clamp((x - a) / (b - a), 0, 1);
}

// Exporta las funciones
export { clamp, lerp, map, smoothstep };
