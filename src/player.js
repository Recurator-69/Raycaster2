export class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0;
      this.speed = 0.075;
      this.sprintSpeed = 0.15;
      this.stamina = 100;
      this.isSprinting = false;
      this.keys = { w: false, s: false, a: false, d: false, shift: false };
  
      this.bindEvents();
    }
  
    bindEvents() {
      window.addEventListener('keydown', (e) => {
        if (e.key in this.keys) this.keys[e.key] = true;
      });
  
      window.addEventListener('keyup', (e) => {
        if (e.key in this.keys) this.keys[e.key] = false;
      });
    }
  
    update(maze) {
      const speed = this.keys.shift && this.stamina > 0 ? this.sprintSpeed : this.speed;
  
      if (this.keys.w) {
        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;
      }
      if (this.keys.s) {
        this.x -= Math.cos(this.angle) * speed;
        this.y -= Math.sin(this.angle) * speed;
      }
  
      // Stamina logic
      if (this.keys.shift && this.stamina > 0) {
        this.isSprinting = true;
        this.stamina -= 0.5; // Adjust depletion rate as needed
      } else {
        this.isSprinting = false;
        if (this.stamina < 100) this.stamina += 0.2; // Adjust regen rate as needed
      }
    }
  }
