var projectSections = ["resume"]

$(function () {
    setTimeout(function () {
        projectSections.forEach(id => {
            $("#" + id).load("./sections/" + id + ".html", function () {
            });
        });
        $("#navbar").load("../../../mainsections/navbar.html")
    }, 2);
});