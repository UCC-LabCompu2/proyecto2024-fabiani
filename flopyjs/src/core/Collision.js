import { BoxShape } from "./BoxShape.js";
import PhysicsEngine from "./PhysicsEngine.js"

export class Collision extends BoxShape {
    constructor(size) {
        super(size);
    }

    _enterTree() {
        super._enterTree();
        PhysicsEngine.addCollider(this);
    }

    _update(delta) {
        super._update();
    }
}