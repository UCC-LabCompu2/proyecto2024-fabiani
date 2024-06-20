export class TileSet {
    constructor(imagePath, tileWidth, tileHeight, columns) {
        this.image = new Image();
        this.image.src = imagePath;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.columns = columns;
    }

    drawTile(ctx, id, x, y) {
        const sourceX = (id % this.columns) * this.tileWidth;
        const sourceY = Math.floor(id / this.columns) * this.tileHeight;
        ctx.drawImage(this.image,
            sourceX, sourceY, this.tileWidth, this.tileHeight,
            x, y, this.tileWidth, this.tileHeight
        );
    }
}