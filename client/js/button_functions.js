function open_page(type) {
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
    pages[page_off].style.display = "none";
}