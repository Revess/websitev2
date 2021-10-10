function scrollAnimation(location) {
    let offset = (window.innerHeight - $("#" + location).height()) / 2;
    let top = document.getElementById(location).getBoundingClientRect().y + document.body.scrollTop;
    $('html, body').animate({
        scrollTop: top - offset
    }, 500);
}