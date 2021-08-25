var pages = {
    "skills": document.getElementById("skills"),
    "title_screen": document.getElementById("title_screen")
}

function open_page(type) {
    let page_on = "";
    let page_off = "";
    for (key in pages) {
        if (pages[key].style.display == "flex") {
            page_off = key;
        } else if (key == type) {
            page_on = key;
        }
    }
    pages[page_on].style.display = "flex";
    pages[page_off].style.display = "none";
}