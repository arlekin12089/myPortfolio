const particles = [];

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  const particlesLength = Math.floor(window.innerWidth / 50);
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background("#000");
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    //Position
    this.pos = createVector(random(width), random(height));
    //Velocity
    this.vel = createVector(random(-5, 5), random(-2, 2));
    //Size
    this.size = 10;
  }
  //Update movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  //Draw single particle
  draw() {
    noStroke();
    fill("rgba(255,255,255,0.5)");
    circle(this.pos.x, this.pos.y, this.size);
  }
  //Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  //Connect particles
  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 120) {
        stroke("rgba(255,255,255,.5)");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
