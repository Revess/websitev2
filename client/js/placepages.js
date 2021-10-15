const pages = ["projects", "arrow", "papers", "resume", "contact"]

$(function () {
    setTimeout(function () {
        pages.forEach(id => {
            $("#" + id).load("./pages/" + id + ".html", function () {
            });
        });
    }, 2);
});