import { Node2D } from "./Node2D.js";
import { TileSet } from "./TileSet.js";
import { CollisionShape } from "./CollisionShape.js";
import { BoxShape } from "./BoxShape.js";
import PhysicsEngine from "./PhysicsEngine.js";
import { Vector2D } from "../utils/Vector2D.js";

export class TileMap extends Node2D {
    constructor(data) {
        super();
        this.tileWidth = data.tileWidth;
        this.tileHeight = data.tileHeight;
        this.tileset = new TileSet(
            data.tilesetImage,
            data.tileWidth,
            data.tileHeight,
            data.columns
        );
        this.layers = data.layers;
    }

    _draw(ctx) {
        this.layers.forEach(layer => {
            for (let y = 0; y < layer.data.length; y++) {
                for (let x = 0; x < layer.data[y].length; x++) {
                    const tileIndex = layer.data[y][x];
                    if (tileIndex === -1) continue;

                    const srcX = (tileIndex % this.tilesPerRow) * this.tileWidth;
                    const srcY = Math.floor(tileIndex / this.tilesPerRow) * this.tileHeight;
                    const destX = x * this.tileWidth;
                    const destY = y * this.tileHeight;
                    
                    ctx.drawImage(this.tileset.image, srcX, srcY, this.tileWidth, this.tileHeight, destX, destY, this.tileWidth, this.tileHeight);
                }
            }
        });
    }

    addCollisions() {
        const collisionLayer = this.layers.find(l => l.name === 'collision');
        if (!collisionLayer) return;

        for (let y = 0; y < collisionLayer.data.length; y++) {
            for (let x = 0; x < collisionLayer.data[y].length; x++) {
                if (collisionLayer.data[y][x] > 0) {
                    const collider = new CollisionShape(new BoxShape(new Vector2D(this.tileWidth, this.tileHeight)));
                    collider.position = new Vector2D(x * this.tileWidth, y * this.tileHeight);
                    PhysicsEngine.addCollider(collider);
                }
            }
        }
    }
}