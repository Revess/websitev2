window.onresize = function () {
    set_circle();
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function set_circle() {
    let title = document.getElementById("title");
    let title_bounds = title.getBoundingClientRect();
    let title_middle_x = title_bounds.left + (title_bounds.width / 2)
    let title_middle_y = title_bounds.top + (title_bounds.height / 2)
    let number_of_buttons = 6;
    let button_angle = 360 / number_of_buttons;
    let circle_id = "svg_rot-"
    let height_multiplier = 5;
    for (i = 0; i < number_of_buttons; i++) {
        //set the new elements and its wrappers
        let angle = i * button_angle;
        let svg_holder = document.getElementById(circle_id + angle)
        svg_holder.children[1].id = svg_holder.id + "name";
        svg_holder.style = "";
        svg_holder.style.height = title_bounds.height * height_multiplier + "px";
        let name_holder = document.getElementById(svg_holder.id + "name");
        name_holder.style = "";
        let svg_bounds = svg_holder.getBoundingClientRect();
        let middle_x = title_middle_x - ((Math.cos(toRadians(angle))) * ((svg_bounds.width / 2) + (title_bounds.width / 0.9))) - (svg_bounds.width / 2)
        let middle_y = title_middle_y - ((Math.sin(toRadians(angle))) * svg_bounds.height * 1) - (svg_bounds.height / 2)
        name_holder.style.position = "relative";

        svg_holder.style.left = middle_x + "px";
        svg_holder.style.top = middle_y + "px";

        svg_bounds = svg_holder.getBoundingClientRect();
        let name_bounds = name_holder.getBoundingClientRect();
        name_holder.style.bottom = (svg_bounds.height / 2) + (name_bounds.height / 2) + "px";
        name_holder.style.right = (name_bounds.height / 2) + "px";

        svg_holder.style.transform = "rotate(" + angle + "deg)"
        name_holder.style.transform = "rotate(" + 270 + "deg)"
    }
}