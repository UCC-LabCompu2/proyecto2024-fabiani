
export class Renderer {
    constructor() {
        if (!Renderer.instance) {
            Renderer.instance = this;
        }
        return Renderer.instance;
    }

    static getInstance() {
        if (!Renderer.instance) {
            throw new Error("Renderer not initialized. Call new Renderer() first.");
        }
        return Renderer.instance;
    }

    setViewport(viewport) {
        this.viewport = viewport;
    }

    setup(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(sceneTree) {
        this.clear();
        if (this.viewport && this.viewport.camera) {
            this.ctx.save();
            const camera = this.viewport.camera;
            const position = camera.getGlobalPosition();
           
            this.ctx.translate(-position.x + this.canvas.width / 2, -position.y + this.canvas.height / 2);
        }

        sceneTree.render(this.ctx);

        if (this.viewport && this.viewport.camera) {
            this.ctx.restore();
        }
    }
}

