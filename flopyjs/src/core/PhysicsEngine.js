class PhysicsEngine {
    constructor() {
        this.colliders = [];

        if (PhysicsEngine.instance) {
            return PhysicsEngine.instance;
        }
        PhysicsEngine.instance = this;
    }

    addCollider(collider) {
        if (this.colliders.includes(collider)) return;
        this.colliders.push(collider);
    }

    removeCollider(collider) {
        const index = this.colliders.indexOf(collider);
        if (index > -1) {
            this.colliders.splice(index, 1);
        }
    }

}

export default new PhysicsEngine()
export { PhysicsEngine }