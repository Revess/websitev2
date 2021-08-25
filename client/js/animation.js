var canvas = document.getElementById("main_menu");
var ctx = canvas.getContext("2d");
var particles = [];
var vectors = [];
var unlock_hover = true;
const num_particles = Math.round(175 * ((Math.random() / 2) + 0.5));
const particle_distance = Math.round(175 * ((Math.random() / 4) + 0.75));
const radius = 3;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function find_distance(a, b) {
    let x = Math.abs(a.x - b.x);
    let y = Math.abs(a.y - b.y);
    return Math.hypot(x, y)
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

class Vector {
    constructor(distance) {
        this.radius = 10;
        this.x = 0;
        this.y = 0;
        this.Color = "rgba(255, 255, 255," + distance + ")";
        this.start = "";
        this.end = "";
        this.on = (Math.round(Math.random())) + 1;
    }

    Draw(start, end, distance) {
        this.Color = "rgba(255, 255, 255," + distance + ")";
        ctx.strokeStyle = this.Color;
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

class Particle {
    constructor(x, y) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5);
        this.vy = (Math.random() - 0.5);
        this.gravity = Math.random();
        this.Color = "rgba(255, 255, 255, " + ((Math.random() / 2) + 0.5) + ")";
        this.name = makeid(5);
    }

    Draw() {
        ctx.fillStyle = this.Color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    Update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius <= 0) {
            this.vx = Math.abs(this.vx)
        } else if (this.x + this.radius >= canvas.width) {
            this.vx = -Math.abs(this.vx);
        }
        if (this.y - this.radius <= 0) {
            this.vy = Math.abs(this.vy)
        } else if (this.y + this.radius >= canvas.height) {
            this.vy = -Math.abs(this.vy);
        }
    }
}

function find_particle(name) {
    for (i = 0; i < particles.length; i++) {
        if (particles[i].name == name) {
            return i;
        }
    }
}

function hover_particle_animation(angle) {
    particles.forEach(particle => {
        particle.vx *= (((angle + 1) / 360) * 5);
        particle.vy *= (((angle + 1) / 360) * 5);
    })
    setTimeout(function () {
        particles.forEach(particle => {
            particle.vx /= (((angle + 1) / 360) * 5);
            particle.vy /= (((angle + 1) / 360) * 5);
        });
        unlock_hover = true;
    }, 100, angle);
}

function loop() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let w = canvas.width;
    let h = canvas.height;
    let number_of_buttons = 6;
    let button_angle = 360 / number_of_buttons;
    let circle_id = "svg_rot-"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw a single particle
    particles.forEach(particle => {
        particle.Update();
        particle.Draw(ctx);
    });

    //find vector and draw them
    particles.forEach(particle => {
        particles.forEach(new_particle => {
            if (particle.name !== new_particle.name) {
                let vector_name = particle.name + "_" + new_particle.name;
                let rev_name = new_particle.name + "_" + particle.name
                let distance = find_distance(particle, new_particle);
                if (distance <= particle_distance) {
                    if (!(vector_name in vectors) && !(rev_name in vectors)) {
                        vectors[vector_name] = new Vector();
                        vectors[vector_name].start = particle.name;
                        vectors[vector_name].end = new_particle.name;
                    } else if (vector_name in vectors) {
                        vectors[vector_name].Draw([particle.x, particle.y], [new_particle.x, new_particle.y], 1 - (distance / particle_distance));
                    }
                } else {
                    delete vectors[vector_name]
                }
            }
        });
    });

    if (unlock_hover) {
        for (i = 0; i < number_of_buttons; i++) {
            //set the new elements and its wrappers
            let angle = i * button_angle;
            let svg_holder = document.getElementById(circle_id + angle)
            if (svg_holder.matches(':hover')) {
                unlock_hover = false;
                hover_particle_animation(angle)
                break;
            }
        }
    }
    requestAnimationFrame(loop);
}

let x = canvas.width * ((Math.random() / 3) + 0.33);
let y = canvas.height * ((Math.random() / 3) + 0.33);
for (i = 0; i < num_particles; i++) {
    x = canvas.width * Math.random();
    y = canvas.height * Math.random();
    particles.push(new Particle(x, y))
}

loop()