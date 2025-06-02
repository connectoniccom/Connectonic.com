alert('hello universe');


document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
}, false);


window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { // Ctrl + Shift + I
        e.preventDefault();
    } else if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { // Ctrl + Shift + J
        e.preventDefault();
    } else if (e.ctrlKey && e.keyCode == 85) { // Ctrl + U
        e.preventDefault();
    }
}, false);


window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 75) { // Ctrl + Shift + K
        e.preventDefault();
    }
}, false);


window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.keyCode == 83) { // Ctrl + S
        e.preventDefault();
    }
}, false);


window.addEventListener("keydown", function(e) {
    if (e.keyCode == 123) { // F12
        e.preventDefault();
    }
}, false);


