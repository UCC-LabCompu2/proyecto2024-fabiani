function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function map(x, in_min, in_max, out_min, out_max) {
    return lerp(out_min, out_max, (x - in_min) / (in_max - in_min));
}

function smoothstep(a, b, x) {
    return clamp((x - a) / (b - a), 0, 1);
}

export { clamp, lerp, map, smoothstep };