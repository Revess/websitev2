var percentage_collapsed = 1;

function titleResize() {
    let title_page = document.getElementById("title_page");
    let navbar = document.getElementById("navbar");
    let text = document.getElementById("title");
    let title_container = document.getElementById("title_container");
    title_container.style.transition = "all 0.25s ease-in-out"
    title_page.style.transition = "all 0.25s ease-in-out"
    canvas.style.transition = "all 0.25s ease-in-out"
    text.style.transition = "all 0.25s ease-in-out"
    if (Array.from(document.getElementById("hidden_element").classList).includes("show")) {
        title_container.style.height = window.innerHeight - navbar.getBoundingClientRect().height - (window.innerHeight * percentage_collapsed) + "px";
    } else {
        title_container.style.height = window.innerHeight - (navbar.getBoundingClientRect().height * 2) + "px";
        percentage_collapsed = navbar.getBoundingClientRect().height / window.innerHeight;
    }
    setTimeout(function () {
        text.style.marginTop = (title_page.getBoundingClientRect().height / 2) - (text.getBoundingClientRect().height / 2) - (window.innerHeight * 0.02) + "px";
    }, 250);
}

window.addEventListener('resize', titleResize);