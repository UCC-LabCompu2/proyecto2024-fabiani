class Joystick {
    constructor(container) {
        this.container = container;
        this.container.style.position = 'relative';
        this.size = Math.min(container.offsetWidth, container.offsetHeight);
        this.radius = this.size / 2;
        this.centerX = this.radius;
        this.centerY = this.radius;
        this.coordX = 0;
        this.coordY = 0;

        this.createCanvas();
        this.initEvents();
        this.draw();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    initEvents() {
        this.canvas.addEventListener('mousedown', this.startDrag.bind(this));
        this.canvas.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));

        this.canvas.addEventListener('touchstart', this.startDrag.bind(this), { passive: true });
        this.canvas.addEventListener('touchmove', this.onDrag.bind(this), { passive: true });
        document.addEventListener('touchend', this.endDrag.bind(this), { passive: true });
    }

    startDrag(event) {
        this.dragging = true;
        this.updatePosition(event);
    }

    onDrag(event) {
        if (this.dragging) {
            this.updatePosition(event);
        }
    }

    endDrag() {
        this.dragging = false;
        this.coordX = 0;
        this.coordY = 0;
        this.draw();
    }

    updatePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        const x = clientX - rect.left - this.centerX;
        const y = clientY - rect.top - this.centerY;

        const distance = Math.sqrt(x * x + y * y);
        if (distance > this.radius) {
            const angle = Math.atan2(y, x);
            this.coordX = Math.cos(angle);
            this.coordY = Math.sin(angle);
        } else {
            this.coordX = x / this.radius;
            this.coordY = y / this.radius;
        }

        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw outer circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'lightgray';
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        // Draw inner disk
        const diskX = this.centerX + this.coordX * this.radius;
        const diskY = this.centerY + this.coordY * this.radius;
        this.ctx.beginPath();
        this.ctx.arc(diskX, diskY, this.radius / 4, 0, Math.PI * 2);
        this.ctx.fillStyle = 'gray';
        this.ctx.fill();
    }
}

// Usage example
document.addEventListener('DOMContentLoaded', () => {
    const joystickContainer = document.getElementById('joystick1');
    const joystick = new Joystick(joystickContainer);

    setInterval(() => {
        console.log(`Joystick position: x=${joystick.coordX.toFixed(2)}, y=${joystick.coordY.toFixed(2)}`);
    }, 100);
});
