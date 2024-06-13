const fs = require('fs');
const uglifyjs = require('uglify-js');
const libreria = fs.readFileSync('flopyjs', 'utf8');
const minificado = uglifyjs.minify(libreria);
fs.writeFileSync('flopyjs.min.js', minificado.code);

const purgecss = require('purgecss');
const css = fs.readFileSync('flopyjs.min.js', 'utf8');
const purged = purgecss.minify(css);
fs.writeFileSync('flopyjs.purged.min.css', purged);
