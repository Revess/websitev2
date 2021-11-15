const projects = ["ADM"]
var projectSections = ["subnav"]

$(function () {
    $("#navbar").load("../../../mainsections/navbar.html", function () {
        $("#papers").load("../../../mainsections/papers.html", function () {
            document.querySelectorAll(".pagesettings")[0].classList.remove("secondary");
            var paperboxes = document.querySelectorAll(".project-box")
            for (i = 0; i < paperboxes.length; i++) {
                paperboxes[i].classList.remove("secondary")
            }
        });
    })
});