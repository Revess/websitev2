function parse_URL() {
    setTimeout(function () {
        var url = new URL(window.location.href);
        const projects = document.querySelectorAll("#projectsslider" + " .slider-box");
        var hash = "";
        projects.forEach(project => {
            if ("#" + project.id == url.hash) {
                hash = url.hash;
            }
        })
        if (hash !== "") {
            let button = document.querySelectorAll(hash + " .fullscreen-button")[0];
            let stopping = false;
            while (!stopping) {
                let prj = document.querySelectorAll("#projectsslider" + " .slider-box");
                prj.forEach((project, index) => {
                    if ("#" + project.id == hash) {
                        if (index == 2) {
                            stopping = true;
                        } else if (index < 2) {
                            shiftRight('#projectsslider');
                        } else if (index > 2) {
                            shiftLeft('#projectsslider');
                        }
                    }
                });
            }
            setTimeout(function () {
                button.click();
            }, 20);
        }
    }, 20);
}