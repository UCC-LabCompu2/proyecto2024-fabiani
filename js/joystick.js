class Joystick {
    constructor(containerId) {
        this.joystickContainer = document.getElementById(`${containerId}`);
        this.joystick = document.getElementById('joystick');
        
        this.centerX = this.joystickContainer.offsetWidth / 2;
        this.centerY = this.joystickContainer.offsetHeight / 2;
        this.maxDistance = this.joystickContainer.offsetWidth / 2 - this.joystick.offsetWidth / 2;
        this.relativeX = 0;
        this.relativeY = 0;
        this.dragging = false;

        this.initEvents();
    }

    startDrag(e) {
        if (e.target === this.joystick) {
            e.preventDefault();
            this.dragging = true;
            this.updatePosition(e);
        }
    }

    onDrag(e) {
        if (this.dragging) {
            e.preventDefault();
            this.updatePosition(e);
        }
    }

    endDrag(e) {
        if (this.dragging) {
            e.preventDefault();
            this.dragging = false;
            this.joystick.style.transform = 'translate(0px, 0px)';
            this.relativeX = 0;
            this.relativeY = 0;
        }
    }

    updatePosition(e) {
        const rect = this.joystickContainer.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left - this.centerX;
        const y = clientY - rect.top - this.centerY;

        const distance = Math.sqrt(x * x + y * y);
        let newX = x;
        let newY = y;

        if (distance > this.maxDistance) {
            const angle = Math.atan2(y, x);
            newX = Math.cos(angle) * this.maxDistance;
            newY = Math.sin(angle) * this.maxDistance;
        }

        this.joystick.style.transform = `translate(${newX}px, ${newY}px)`;

        this.relativeX = newX / this.maxDistance;
        this.relativeY = newY / this.maxDistance;
    }

    initEvents() {
        document.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });

        document.addEventListener('mousemove', (e) => this.onDrag(e));
        document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });

        document.addEventListener('mouseup', (e) => this.endDrag(e));
        document.addEventListener('touchend', (e) => this.endDrag(e));
    }
}

export default Joystick;
export { Joystick }