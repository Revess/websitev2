const projects = ["ADM"]
var projectSections = ["subnav"]

$(function () {
    setTimeout(function () {
        var url = new URL(window.location.href);
        projects.forEach(project => {
            if (url.href.split("/").includes(project)) {
                projectSections.push(project)
            }
        })
        projectSections.forEach(id => {
            $("#" + id).load("./sections/" + id + ".html", function () {
            });
        });
        $("#navbar").load("../../../mainsections/navbar.html")
    }, 2);
});