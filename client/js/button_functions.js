var global_type = ""

function open_page(type) {
    if (type !== global_type) {
        global_type = type;
        let page_on = "";
        let page_off = "";
        for (key in pages) {
            if (pages[key].style.display !== "none") {
                page_off = key;
            } else if (key == type) {
                page_on = key;
            }
        }
        pages[page_on].style.display = "block";
        setTimeout(function () {
            pages[page_on].classList.toggle("fade_in");
            pages[page_off].classList.toggle("fade_in");
        }, 100);

        setTimeout(function () {
            pages[page_off].style.display = "none";
        }, 500);
    }
}

function unmute() {
    let unmute_button = document.getElementById("unmute");
    document.getElementById("muted").style.display = "none"
    document.getElementById("unmuted").style.display = "block"
    setTimeout(function () {
        unmute_button.classList.toggle("volume_button_active");

        setTimeout(function () {
            unmute_button.style.display = "none"
            document.body.style.overflow = "auto"
        }, 500);
        pages["title_screen"].style.display = "block";
        document.getElementById("background").style.display = "block";
        set_circle();
        pages["title_screen"].classList.toggle("fade_in");
        document.getElementById("background").classList.toggle("fade_in");
    }, 100);
}