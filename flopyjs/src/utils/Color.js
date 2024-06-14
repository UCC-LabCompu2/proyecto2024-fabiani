export class Color {
    constructor(r = 1, g = 1, b = 1, a = 1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this._brightness = 0;
      this._saturation = 0;
      this._contrast = 1;
    }
  
    toString() {
      return `rgba(${this.r * 255},${this.g * 255},${this.b * 255},${this.a * 255})`;
    }

    get brightness() {
      return this._brightness;
    }

    set brightness(value) {
      this._brightness = value;
      this.adjustBrightness();
    }

    get saturation() {
      return this._saturation;
    }

    set saturation(value) {
      this._saturation = value;
      this.adjustSaturation();
    }

    get contrast() {
      return this._contrast;
    }

    set contrast(value) {
      this._contrast = value;
      this.adjustContrast();
    }

    adjustBrightness() {
      this.r = Math.min(Math.max(this.r + this._brightness, 0), 1);
      this.g = Math.min(Math.max(this.g + this._brightness, 0), 1);
      this.b = Math.min(Math.max(this.b + this._brightness, 0), 1);
    }

    adjustSaturation() {
      const max = Math.max(this.r, this.g, this.b);
      const min = Math.min(this.r, this.g, this.b);
      const delta = max - min;

      this.r = this.r + (delta ? ((max - this.r) / delta) * this._saturation : 0);
      this.g = this.g + (delta ? ((max - this.g) / delta) * this._saturation : 0);
      this.b = this.b + (delta ? ((max - this.b) / delta) * this._saturation : 0);
    }

    adjustContrast() {
      this.r = Math.min(Math.max((this.r - 0.5) * this._contrast + 0.5, 0), 1);
      this.g = Math.min(Math.max((this.g - 0.5) * this._contrast + 0.5, 0), 1);
      this.b = Math.min(Math.max((this.b - 0.5) * this._contrast + 0.5, 0), 1);
    }
  
    static get WHITE() { return new Color(1, 1, 1, 1); }
    static get BLACK() { return new Color(0, 0, 0, 1); }
    static get RED() { return new Color(1, 0, 0, 1); }
    static get GREEN() { return new Color(0, 1, 0, 1); }
    static get BLUE() { return new Color(0, 0, 1, 1); }
    static get YELLOW() { return new Color(1, 1, 0, 1); }
    static get CYAN() { return new Color(0, 1, 1, 1); }
    static get MAGENTA() { return new Color(1, 0, 1, 1); }
    static get ORANGE() { return new Color(1, 0.5, 0, 1); }
    static get PINK() { return new Color(1, 0.75, 0.8, 1); }
    static get PURPLE() { return new Color(0.5, 0, 0.5, 1); }
    static get GRAY() { return new Color(0.5, 0.5, 0.5, 1); }
    static get LIGHT_GRAY() { return new Color(0.75, 0.75, 0.75, 1); }
    static get DARK_GRAY() { return new Color(0.25, 0.25, 0.25, 1); }
    static get BROWN() { return new Color(0.65, 0.16, 0.16, 1); }
    static get TRANSPARENT() { return new Color(0, 0, 0, 0); }
    static get HALF_WHITE() { return new Color(1, 1, 1, 0.5); }
    static get HALF_BLACK() { return new Color(0, 0, 0, 0.5); }
  }