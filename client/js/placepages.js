const sections = ["projects", "papers", "resume", "navbar", "title"]

$(function () {
    setTimeout(function () {
        sections.forEach(id => {
            $("#" + id).load("./mainsections/" + id + ".html", function () {
            });
        });
    }, 2);
});