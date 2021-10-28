const sections = ["projects", "arrow", "papers", "resume", "contact", "navbar"]

$(function () {
    setTimeout(function () {
        sections.forEach(id => {
            $("#" + id).load("./mainsections/" + id + ".html", function () {
            });
        });
    }, 2);
});