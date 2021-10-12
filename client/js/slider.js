function shiftLeft(parent) {
    const boxes = document.querySelectorAll(parent + " .slider-box");
    const tmpNode = boxes[0];
    tmpNode.classList.add("slider-box-hide");
    boxes[5].classList.remove("silder-box-hide")
    boxes[2].onclick = boxes[1].onclick
    boxes[1].onclick = ""
    boxes[4].onclick = boxes[3].onclick
    boxes[3].onclick = ""
    boxes[1].className = "slider-box move-position1-left";
    boxes[2].className = "slider-box move-position2-left";
    boxes[3].className = "slider-box move-position3-left";
    boxes[4].className = "slider-box move-position4-left";
    boxes[5].className = "slider-box";
    boxes[3].querySelectorAll(".btn")[0].classList.remove("slider-button-hide")
    boxes[2].querySelectorAll(".btn")[0].classList.add("slider-button-hide")
    boxes[0].remove();
    document.querySelector(parent + " .cards-container").appendChild(tmpNode);
}

function shiftRight(parent) {
    const boxes = document.querySelectorAll(parent + " .slider-box");
    const noOfCards = boxes.length;
    const tmpNode = boxes[noOfCards - 1];
    tmpNode.classList.remove("slider-box-hide");
    boxes[4].classList.add("slider-box-hide");
    tmpNode.className = "slider-box";
    boxes[0].onclick = boxes[1].onclick
    boxes[1].onclick = ""
    boxes[2].onclick = boxes[3].onclick
    boxes[3].onclick = ""

    boxes[0].className = "slider-box move-position0-right";
    boxes[1].className = "slider-box move-position1-right";
    boxes[2].className = "slider-box move-position2-right";
    boxes[3].className = "slider-box move-position3-right";
    boxes[1].querySelectorAll(".btn")[0].classList.remove("slider-button-hide")
    boxes[2].querySelectorAll(".btn")[0].classList.add("slider-button-hide")
    boxes[noOfCards - 1].remove();
    let parentObj = document.querySelector(parent + " .cards-container");
    parentObj.insertBefore(tmpNode, parentObj.firstChild);
}

function fullScreen(item) {
    var box = document.getElementById(item);
    var navbar = document.getElementById("navbar");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    navbar.style.display = "none";
    box.classList.add("slider-box-fullscreen");
    box.querySelectorAll(".fullscreen-button")[0].style.display = "none"
    box.querySelectorAll(".exitfullscreen-button")[0].style.display = ""
    box.querySelectorAll(".preview")[0].style.display = "none"
    box.querySelectorAll(".fullscreen-content")[0].style.display = ""
    box.scrollTop = "0"
}

function exitfullScreen(item) {
    var box = document.getElementById(item);
    var navbar = document.getElementById("navbar");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    navbar.style.display = "";
    box.classList.remove("slider-box-fullscreen");
    box.querySelectorAll(".fullscreen-button")[0].style.display = ""
    box.querySelectorAll(".exitfullscreen-button")[0].style.display = "none"
    box.querySelectorAll(".preview")[0].style.display = ""
    box.querySelectorAll(".fullscreen-content")[0].style.display = "none"
}