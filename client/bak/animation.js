var canvas = document.getElementById("main_menu");
var ctx = canvas.getContext("2d");
var particles = [];
var vectors = [];
var unlock_hover = true;
var num_particles = Math.round(100 * window.innerHeight / 1181);
const particle_distance = 175
const radius = 3;
const max_speed = 2;
const gravity_on = true;

function setCanvas() {
    let window_props = document.getElementById("title_page").getBoundingClientRect();
    canvas.width = window_props.width;
    canvas.height = window_props.height;
    canvas.style.width = window_props.width + "px";
    canvas.style.height = window_props.height + "px";
}

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
        this.radius = (radius - 1) * (Math.random() + 1);
        this.x = x;
        this.y = y;
        this.vx = ((Math.random() * 4) - 0.5);
        this.vy = ((Math.random() * 4) - 0.5);
        this.gravity = Math.random() * 2.5;
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

        particles.forEach(new_particle => {
            if (this.name !== new_particle.name && new_particle.x < (this.x + particle_distance) && new_particle.x > (this.x - particle_distance) && new_particle.y < (this.y + particle_distance) && new_particle.y > (this.y - particle_distance)) {
                if ((this.x + this.radius) >= (new_particle.x - new_particle.radius) && (this.x + this.radius) < (new_particle.x + new_particle.radius) && (this.y + this.radius) >= (new_particle.y - new_particle.radius) && (this.y + this.radius) < (new_particle.y + new_particle.radius)) {
                    this.vx -= new_particle.vx * (this.radius / radius) * (Math.random() * 0.);
                    this.vy -= new_particle.vy * (this.radius / radius) * (Math.random() * 0.5);
                }
                //The distance calulations
                let vector_name = this.name + "_" + new_particle.name;
                let rev_name = new_particle.name + "_" + this.name
                let distance = find_distance(this, new_particle);
                if (distance <= particle_distance) {
                    if (!(vector_name in vectors) && !(rev_name in vectors)) {
                        vectors[vector_name] = new Vector();
                        vectors[vector_name].start = this.name;
                        vectors[vector_name].end = new_particle.name;
                    } else if (vector_name in vectors) {
                        vectors[vector_name].Draw([this.x, this.y], [new_particle.x, new_particle.y], 1 - (distance / particle_distance));
                    }
                    if (gravity_on) {
                        this.vx -= ((((this.x - new_particle.x) / canvas.width) / particle_distance) * new_particle.gravity * (this.radius / radius));
                        this.vy -= ((((this.y - new_particle.y) / canvas.height) / particle_distance) * new_particle.gravity * (this.radius / radius));
                        if (this.vx > max_speed) {
                            this.vx -= 0.5
                        }
                        if (this.vy > max_speed) {
                            this.vy -= 0.5
                        }
                        if (Math.random > 0.3) {
                            this.vx += (Math.random() * 2) - 1
                        }
                        if (Math.random > 0.5) {
                            this.vy += (Math.random() * 2) - 1
                        }
                    }
                } else {
                    delete vectors[vector_name]
                }

            }
        });
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
    num_particles = Math.round(100 * window.innerHeight / 1181);
    setCanvas();
    if ($(window).scrollTop() < $("#projects").position().top && document.getElementById("background").style.display !== "none") {
        if (num_particles > particles.length) {
            for (i = 0; i < num_particles - particles.length; i++) {
                x = canvas.width * Math.random();
                y = canvas.height * Math.random();
                particles.push(new Particle(x, y))
            }
        } else if (num_particles < particles.length) {
            console.log(Math.round(particles.length - num_particles), particles.length)
            particles.splice(0, Math.round(particles.length - num_particles))
        }
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

    }
    requestAnimationFrame(loop);
}

setTimeout(function () { loop() }, 250)